import { Server, Socket } from 'socket.io';
import { RoomController } from '../controllers/room.controller';
import { SocketAction } from '../models/object/socket.model';

export namespace RoomSocket {

  /**
   * Register function for room functionality
   * @param io Socket server
   * @param socket Socket connection
   */
  export async function register(io: Server, socket: Socket) {
    socket.emit(SocketAction.ROOM_LIST, await getRoomCollection(io));

    let previous: string | undefined = undefined;
    socket.on(SocketAction.ROOM_JOIN, (room) => {
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
      if (!room.startsWith(SocketAction.ROOM)) return;
      io.emit(SocketAction.ROOM_LIST, await getRoomCollection(io));
      console.log(`room ${room} was created`);
    });

    io.sockets.adapter.on('delete-room', async (room) => {
      if (!room.startsWith(SocketAction.ROOM)) return;
      io.emit(SocketAction.ROOM_LIST, await getRoomCollection(io));
      console.log(`room ${room} was deleted`);
    });

    io.sockets.adapter.on('join-room', async (room, id) => {
      if (!room.startsWith(SocketAction.ROOM)) return;
      io.emit(SocketAction.ROOM_LIST, await getRoomCollection(io));
      console.log(`socket ${id} has joined room ${room}`);
    });

    io.sockets.adapter.on('leave-room', async (room, id) => {
      if (!room.startsWith(SocketAction.ROOM)) return;
      io.emit(SocketAction.ROOM_LIST, await getRoomCollection(io));
      console.log(`socket ${id} has left room ${room}`);
    });
  }

  export async function getRoomCollection(io: Server) {
    const rooms = await getRooms(io);
    const collection: any = {};
    for (const room of rooms) collection[room] = await getSockets(io, room);
    return collection;
  }

  /**
   * Retrieve all current available rooms. (Rooms from socket connections are excluded)
   * @param io Socket server
   * @returns Promise Array of room strings
   */
  export async function getRooms(io: Server) {
    var list = await getSockets(io);
    return [...io.sockets.adapter.rooms].map(([entry, set]) => entry).filter((x) => !list.includes(x)).filter((x) => x.startsWith(SocketAction.ROOM)).map((x) => x.substring(SocketAction.ROOM.length));
  }

  /**
   * Retrieve all socket IDs from server (or room)
   * @param io Socket server
   * @param room Room name
   * @returns Promise Array of socket IDs
   */
  export async function getSockets(io: Server, room?: string) {
    if (room) return (await io.in(realRoomName(room)).fetchSockets()).map((x) => x.id);
    else return (await io.fetchSockets()).map((x) => x.id);
  }

  export function realRoomName(room: string): string {
    let temp = room;
    if (!temp.startsWith(SocketAction.ROOM)) temp = SocketAction.ROOM + temp;
    return temp;
  }
}
