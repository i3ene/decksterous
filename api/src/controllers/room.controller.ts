import { Server, Socket } from "socket.io";
import { RoomAction, RoomActionEvent } from "../models/object/socket.model";
import { RoomSocket } from "../socket/room.socket";
import { GameController } from "./game.controller";

export namespace RoomController {
  export async function join(io: Server, socket: Socket, room: string, previous?: string) {
    if (room.startsWith('game_')) return;

    socket.join(room);
    io.to(room).emit('room_socket_join', new RoomActionEvent(socket.id, room, RoomAction.JOIN));
    var list = await RoomSocket.getSockets(io, room);
    io.to(room).emit('room_socket_list', { [room]: list });

    if (previous) leave(io, socket, previous);
    previous = room;

    joinEvents(io, socket, room);
  }

  export async function leave(io: Server, socket: Socket, room: string) {
    io.to(room).emit('room_socket_leave', new RoomActionEvent(socket.id, room, RoomAction.LEAVE));
    socket.leave(room);
    var list = await RoomSocket.getSockets(io, room);
    io.to(room).emit('room_socket_list', { [room]: list });

    leaveEvents(io, socket);    
  }

  export function joinEvents(io: Server, socket: Socket, room: string) {
    socket.on('room_leave', (event) => leave(io, socket, room));
    socket.on("room_event", async (event) => {
      io.to(room).emit("room_socket_event", event);
      actionEvent(io, socket, room, event);
    });
    socket.on("game_join", async (event) => {
      GameController.join(io, socket, 'game_' + room);
    });
    socket.on("game_leave", async (event) => {
      GameController.leave(io, socket, 'game_' + room);
    });
  }

  export function leaveEvents(io: Server, socket: Socket) {
    socket.removeAllListeners("room_event");
    socket.removeAllListeners("room_leave");
    socket.removeAllListeners("game_join");
    socket.removeAllListeners("game_leave");
  }

  export function actionEvent(io: Server, socket: Socket, room: string, event: any) {
    if (!event.action) return;

    // TODO: Handle actions
  }
}