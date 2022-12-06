import { Server, Socket } from "socket.io";
import { RoomAction, RoomSocketEvent, SocketAction } from "../models/object/socket.model";
import { RoomSocket } from "../socket/room.socket";
import { GameController } from "./game.controller";

export namespace RoomController {
  export async function join(io: Server, socket: Socket, room: string, previous?: string) {
    room = SocketAction.ROOM + room;

    if (previous) leave(io, socket, previous);
    if (room.startsWith(SocketAction.GAME)) return;

    socket.join(room);
    socket.emit(SocketAction.ROOM_SOCKET_JOIN, new RoomSocketEvent(socket.id, room, RoomAction.JOIN));
    //io.to(room).emit();
    var list = await RoomSocket.getSockets(io, room);
    io.to(room).emit(SocketAction.ROOM_SOCKET_LIST, { [room]: list });

    joinEvents(io, socket, room);
  }

  export async function leave(io: Server, socket: Socket, room: string) {
    //io.to(room).emit();
    socket.emit(SocketAction.ROOM_LEAVE, new RoomSocketEvent(socket.id, room, RoomAction.LEAVE));
    socket.leave(room);
    var list = await RoomSocket.getSockets(io, room);
    io.to(room).emit(SocketAction.ROOM_SOCKET_LIST, { [room]: list });

    leaveEvents(io, socket);    
  }

  export function joinEvents(io: Server, socket: Socket, room: string) {
    socket.on(SocketAction.ROOM_LEAVE, (event) => leave(io, socket, room));
    socket.on(SocketAction.ROOM_SERVER, async (event) => {
      io.to(room).emit(SocketAction.ROOM_SOCKET, event);
      actionEvent(io, socket, room, event);
    });
    socket.on(SocketAction.GAME_JOIN, async (event) => {
      GameController.join(io, socket, SocketAction.GAME + room);
    });
    socket.on(SocketAction.GAME_LEAVE, async (event) => {
      GameController.leave(io, socket, SocketAction.GAME + room);
    });
  }

  export function leaveEvents(io: Server, socket: Socket) {
    socket.removeAllListeners(SocketAction.ROOM_SERVER);
    socket.removeAllListeners(SocketAction.ROOM_LEAVE);
    socket.removeAllListeners(SocketAction.GAME_JOIN);
    socket.removeAllListeners(SocketAction.GAME_LEAVE);
  }

  export function actionEvent(io: Server, socket: Socket, room: string, event: any) {
    if (!event.action) return;

    // TODO: Handle actions
  }
}