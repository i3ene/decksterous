import { Server, Socket } from 'socket.io';
import { RoomController } from '../controllers/room.controller';

export namespace RoomSocket {

  // TODO: A Socket can only join ONE Room at a time

  /**
   * Register function for room functionality
   * @param io Socket server
   * @param socket Socket connection
   */
  export async function register(io: Server, socket: Socket) {
    socket.emit('room_list', await getRooms(io));

    let previous: string | undefined = undefined;
    socket.on('room_join', (room) => {
      RoomController.join(io, socket, room, previous);
      previous = room;
    });
  }

  /**
   * Listener functions for room events
   * @param io Socket server
   */
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

  /**
   * Retrieve all current available rooms. (Rooms from socket connections are excluded)
   * @param io Socket server
   * @returns Promise Array of room strings
   */
  export async function getRooms(io: Server) {
    var list = await getSockets(io);
    return [...io.sockets.adapter.rooms].map(([entry, set]) => entry).filter((x) => !list.includes(x)).filter((x) => !x.startsWith('game_'));
  }

  /**
   * Retrieve all socket IDs from server (or room)
   * @param io Socket server
   * @param room Room name
   * @returns Promise Array of socket IDs
   */
  export async function getSockets(io: Server, room?: string) {
    if (room) return (await io.in(room).fetchSockets()).map((x) => x.id);
    else return (await io.fetchSockets()).map((x) => x.id);
  }
}
