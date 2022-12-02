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
      actionEvent(io, socket, room, event);
    });
  }

  export function leaveEvents(io: Server, socket: Socket) {
    socket.removeAllListeners('game_event');
  }

  export async function addPlayer(io: Server, socket: Socket, room: string) {
    const game = games.get(room);
    if (!game) return;
    const player = new GamePlayer(socket, socket.user!);
    game.players.add(player);
  }

  export async function removePlayer(io: Server, socket: Socket, room: string) {
    const game = games.get(room);
    if (!game) return;
    const player = game.players.find(socket.user?.id!);
    if (!player) return;
    game.players.remove(player);
  }

  export function actionEvent(io: Server, socket: Socket, room: string, event: any) {
    if (!event.action) return;

    switch (event.action) {
      case 'select_deck':
        selectDeck(io, socket, room, event.deckId);
        break;
      case 'set_ready':
        setReady(io, socket, room, event.state);
        break;
      case 'test':
        socket.emit('game_socket_event', { players: games.get(room)?.players.map.size });
        break;
    }
  }

  export async function selectDeck(io: Server, socket: Socket, room: string, deckId: number) {
    const game = games.get(room);
    if (!game) return;
    const player = game.players.get(socket.user?.id!);
    if (!player) return;
    player.selectDeck(deckId);
  }

  export async function setReady(io: Server, socket: Socket, room: string, state: boolean) {
    const game = games.get(room);
    if (!game) return;
    const player = game.players.get(socket.user?.id!);
    if (!player) return;
    player.isReady = state;
  }
}
