import { Server, Socket } from "socket.io";
import { RoomAction, RoomActionEvent, SocketEvent } from "../models/object/socket.model";
import { RoomSocket } from "../socket/room.socket";
import { GameController } from "./game.controller";

export namespace RoomController {
  export async function join(io: Server, socket: Socket, room: string, previous?: string) {
    if (previous) leave(io, socket, previous);
    if (room.startsWith(SocketEvent.GAME)) return;

    socket.join(room);
    io.to(room).emit(SocketEvent.ROOM_SOCKET_JOIN, new RoomActionEvent(socket.id, room, RoomAction.JOIN));
    var list = await RoomSocket.getSockets(io, room);
    io.to(room).emit(SocketEvent.ROOM_SOCKET_LIST, { [room]: list });

    joinEvents(io, socket, room);
  }

  export async function leave(io: Server, socket: Socket, room: string) {
    io.to(room).emit(SocketEvent.ROOM_LEAVE, new RoomActionEvent(socket.id, room, RoomAction.LEAVE));
    socket.leave(room);
    var list = await RoomSocket.getSockets(io, room);
    io.to(room).emit(SocketEvent.ROOM_SOCKET_LIST, { [room]: list });

    leaveEvents(io, socket);    
  }

  export function joinEvents(io: Server, socket: Socket, room: string) {
    socket.on(SocketEvent.ROOM_LEAVE, (event) => leave(io, socket, room));
    socket.on(SocketEvent.ROOM_SERVER, async (event) => {
      io.to(room).emit(SocketEvent.ROOM_SOCKET, event);
      actionEvent(io, socket, room, event);
    });
    socket.on(SocketEvent.GAME_JOIN, async (event) => {
      GameController.join(io, socket, SocketEvent.GAME + room);
    });
    socket.on(SocketEvent.GAME_LEAVE, async (event) => {
      GameController.leave(io, socket, SocketEvent.GAME + room);
    });
  }

  export function leaveEvents(io: Server, socket: Socket) {
    socket.removeAllListeners(SocketEvent.ROOM_SERVER);
    socket.removeAllListeners(SocketEvent.ROOM_LEAVE);
    socket.removeAllListeners(SocketEvent.GAME_JOIN);
    socket.removeAllListeners(SocketEvent.GAME_LEAVE);
  }

  export function actionEvent(io: Server, socket: Socket, room: string, event: any) {
    if (!event.action) return;

    // TODO: Handle actions
  }
}