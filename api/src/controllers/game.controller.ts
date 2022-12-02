import { Server, Socket } from 'socket.io';
import { RoomSocket } from '../socket/room.socket';

export namespace GameController {
  export async function join(io: Server, socket: Socket, room: string) {
    socket.join(room);
    io.to(room).emit('game_socket_join', `Socket ${socket.id} joined the game ${room}`);

    joinEvents(io, socket, room);
  }

  export async function leave(io: Server, socket: Socket, room: string) {
    io.to(room).emit('game_socket_leave', `Socket ${socket.id} left the game ${room}`);
    socket.leave(room);

    leaveEvents(io, socket);
  }

  export function joinEvents(io: Server, socket: Socket, room: string) {
    socket.on('game_event', async (event) => {
      io.to(room).emit('game_socket_event', event);
      actionEvent(io, socket, room, event);
    });
  }

  export function leaveEvents(io: Server, socket: Socket) {
    socket.removeAllListeners('game_event');
  }

  export function actionEvent(io: Server, socket: Socket, room: string, event: any) {
    if (!event.action) return;

    switch (event.action) {
      case 'select_deck':
        selectDeck(io, socket, event.deckId);
        break;
    }
  }

  export async function selectDeck(io: Server, socket: Socket, deckId: number) {
    socket.emit('game_socket_event', `Selected Deck with id ${deckId}`);
  }
}
