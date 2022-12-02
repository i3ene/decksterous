import { Server, Socket } from 'socket.io';
import { RoomSocket } from '../socket/room.socket';
import { Game } from '../models/object/game.object';
import { GamePlayer } from '../models/object/game.model';

export namespace GameController {
  export const games: Map<string, Game> = new Map();

  export async function join(io: Server, socket: Socket, room: string) {
    socket.join(room);
    io.to(room).emit('game_socket_join', `User ${socket.user?.name} joined the game ${room}`);

    joinEvents(io, socket, room);
  }

  export async function leave(io: Server, socket: Socket, room: string) {
    io.to(room).emit('game_socket_leave', `User ${socket.user?.name} left the game ${room}`);
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
      case 'set_ready':
        setReady(io, socket, room, true);
        break;
    }
  }

  export async function addPlayer(io: Server, socket: Socket, room: string) {
    const game = games.get(room);
    const player = new GamePlayer(socket, socket.user!, []);
    game?.players.add(player);
  }

  export async function removePlayer(io: Server, socket: Socket, room: string) {
    const game = games.get(room);
    const player = game?.players.find(socket.user?.id!);
    if (!player) return;
    game?.players.remove(player);
  }

  export async function selectDeck(io: Server, socket: Socket, deckId: number) {
    socket.emit('game_socket_event', `Selected Deck with id ${deckId}`);
  }

  export async function setReady(io: Server, socket: Socket, room: string, state: boolean) {
    io.to(room).emit('game_socket_event', `Socket ${socket.id} is ${!state ? 'not' : ''} ready`);
  }
}
