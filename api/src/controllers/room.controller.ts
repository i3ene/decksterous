import { Server, Socket } from "socket.io";
import { RoomAction, RoomActionEvent } from "../models/object/socket.model";
import { RoomSocket } from "../socket/room.socket";

export namespace RoomController {
  export async function join(io: Server, socket: Socket, room: string) {
    socket.join(room);
    io.to(room).emit('room_socket_join', new RoomActionEvent(socket.id, room, RoomAction.JOIN));
    var list = await RoomSocket.getSockets(io, room);
    io.to(room).emit('room_socket_list', { [room]: list });

    joinEvents(io, socket, room);
  }

  export async function leave(io: Server, socket: Socket, room: string) {
    io.to(room).emit('room_socket_leave', new RoomActionEvent(socket.id, room, RoomAction.LEAVE));
    socket.leave(room);
    var list = await RoomSocket.getSockets(io, room);
    io.to(room).emit('room_socket_list', { [room]: list });

    leaveEvents(io, socket, room);    
  }

  export function joinEvents(io: Server, socket: Socket, room: string) {
    socket.on("room_event_" + room, async (event) => {
      io.to(room).emit("room_socket_event_" + room, event);
    });
  }

  export function leaveEvents(io: Server, socket: Socket, room: string) {
    socket.removeAllListeners("room_event_" + room);
  }
}