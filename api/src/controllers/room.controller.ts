import { Server, Socket } from "socket.io";
import { RoomAction, RoomSocketEvent, SocketAction } from "../models/object/socket.model";
import { RoomSocket } from "../socket/room.socket";
import { GameController } from "./game.controller";

export namespace RoomController {
  export async function join(io: Server, socket: Socket, room: string, previous?: string) {
    if (previous) leave(io, socket, previous);
    if (room.startsWith(SocketAction.GAME)) return;

    socket.join(RoomSocket.realRoomName(room));
    socket.emit(SocketAction.ROOM_SOCKET_JOIN, new RoomSocketEvent(socket.id, room, RoomAction.JOIN));
    io.to(RoomSocket.realRoomName(room)).emit(SocketAction.ROOM_SOCKET, new RoomSocketEvent(socket.id, room, RoomAction.JOIN));
    var list = await RoomSocket.getSockets(io, room);
    io.to(RoomSocket.realRoomName(room)).emit(SocketAction.ROOM_SOCKET_LIST, { [room]: list });

    joinEvents(io, socket, room);
  }

  export async function leave(io: Server, socket: Socket, room: string) {
    io.to(RoomSocket.realRoomName(room)).emit(SocketAction.ROOM_SOCKET, new RoomSocketEvent(socket.id, room, RoomAction.LEAVE));
    socket.emit(SocketAction.ROOM_SOCKET_LEAVE, new RoomSocketEvent(socket.id, room, RoomAction.LEAVE));
    socket.leave(RoomSocket.realRoomName(room));
    var list = await RoomSocket.getSockets(io, room);
    io.to(RoomSocket.realRoomName(room)).emit(SocketAction.ROOM_SOCKET_LIST, { [room]: list });

    leaveEvents(io, socket);
  }

  export function joinEvents(io: Server, socket: Socket, room: string) {
    socket.on(SocketAction.ROOM_LEAVE, (event) => leave(io, socket, room));
    socket.on(SocketAction.ROOM_SERVER, async (event) => {
      io.to(RoomSocket.realRoomName(room)).emit(SocketAction.ROOM_SOCKET, event);
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
