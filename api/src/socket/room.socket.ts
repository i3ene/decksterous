import { Server, Socket } from 'socket.io';

export namespace RoomSocket {
  export async function register(io: Server, socket: Socket) {
    socket.emit('room_list', await getRooms(io));

    socket.on('room_join', async (room) => {
      socket.join(room);
      io.to(room).emit('room_socket_join', { socket: socket.id, room: room });
      var list = await await getSockets(io, room);
      io.to(room).emit('room_socket_list', { [room]: list });
    });

    socket.on('room_leave', async (room) => {
      socket.leave(room);
      io.to(room).emit('room_socket_leave', { socket: socket.id, room: room });
      var list = await getSockets(io, room);
      io.to(room).emit('room_socket_list', { [room]: list });
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
