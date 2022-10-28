import { Server, Socket } from 'socket.io';

export namespace RoomSocket {
  export async function register(io: Server, socket: Socket) {
    // Retrieve all current rooms
    socket.emit('room_list', await getRooms(io));

    // Join room
    socket.on('room_join', async (room) => {
      socket.join(room);
      io.to(room).emit('room_socket_join', { socket: socket.id, room: room, action: "joined" });
      var list = await await getSockets(io, room);
      io.to(room).emit('room_socket_list', { [room]: list });

      // Listen to specific room events
      socket.on("room_event_" + room, async (event) => {
        io.to(room).emit("room_socket_event_" + room, event);
      });
    });

    // Leave room
    socket.on('room_leave', async (room) => {
      io.to(room).emit('room_socket_leave', { socket: socket.id, room: room, action: "left" });
      socket.leave(room);
      var list = await getSockets(io, room);
      io.to(room).emit('room_socket_list', { [room]: list });

      // Remove room events
      socket.removeAllListeners("room_event_" + room);
    });
  }

  export function listener(io: Server) {
    io.sockets.adapter.on('create-room', async (room) => {
      io.emit('room_list', await getRooms(io));
      console.log(`room ${room} was created`);
    });

    io.sockets.adapter.on('delete-room', async (room) => {
      io.emit('room_list', await getRooms(io));
      console.log(`room ${room} was deleted`);
    });

    io.sockets.adapter.on('join-room', (room, id) => {
      console.log(`socket ${id} has joined room ${room}`);
    });

    io.sockets.adapter.on('leave-room', (room, id) => {
      console.log(`socket ${id} has left room ${room}`);
    });
  }

  export async function getRooms(io: Server) {
    var list = await getSockets(io);
    return [...io.sockets.adapter.rooms].map(([entry, set]) => entry).filter((x) => !list.includes(x));
  }

  export async function getSockets(io: Server, room?: string) {
    if (room) return (await io.in(room).fetchSockets()).map((x) => x.id);
    else return (await io.fetchSockets()).map((x) => x.id);
  }
}
