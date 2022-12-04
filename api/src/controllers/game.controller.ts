import { Server, Socket } from 'socket.io';
import { RoomSocket } from '../socket/room.socket';
import { Game } from '../models/object/game.object';
import { GamePlayer } from '../models/object/game.model';
import { GameActionEvent, SocketEvent } from '../models/object/socket.model';

export namespace GameController {
  export const games: Map<string, Game> = new Map();

  export async function join(io: Server, socket: Socket, room: string) {
    socket.join(room);
    io.to(room).emit(SocketEvent.GAME_SOCKET_JOIN, `User ${socket.user?.name} joined the game ${room}`);

    joinEvents(io, socket, room);
  }

  export async function leave(io: Server, socket: Socket, room: string) {
    io.to(room).emit(SocketEvent.GAME_SOCKET_LEAVE, `User ${socket.user?.name} left the game ${room}`);
    socket.leave(room);

    leaveEvents(io, socket);
  }

  export function joinEvents(io: Server, socket: Socket, room: string) {
    socket.on(SocketEvent.GAME_SERVER, async (event) => {
      actionEvent(io, socket, room, event);
    });
  }

  export function leaveEvents(io: Server, socket: Socket) {
    socket.removeAllListeners(SocketEvent.GAME_SERVER);
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
      case GameActionEvent.SELECT_DECK:
        selectDeck(io, socket, room, event.deckId);
        break;
      case GameActionEvent.SET_READY:
        setReady(io, socket, room, event.state);
        break;
      case 'test':
        socket.emit(SocketEvent.GAME_SOCKET, { players: games.get(room)?.players.map.size });
        break;
    }
  }

  export async function selectDeck(io: Server, socket: Socket, room: string, deckId: number) {
    const game = games.get(room);
    if (!game) return;
    const player = game.players.get(socket.user?.id!);
    if (!player) return;
    const success = await player.selectDeck(deckId);
    if (!success) socket.emit(SocketEvent.GAME_SOCKET, `Deck ${deckId} could not be selected!`);
    else socket.emit(SocketEvent.GAME_SOCKET, `Deck ${deckId} selected`);
  }

  export async function setReady(io: Server, socket: Socket, room: string, state: boolean) {
    const game = games.get(room);
    if (!game) return;
    const player = game.players.get(socket.user?.id!);
    if (!player) return;
    const success = player.setReady(state);
    if (!success) socket.emit(SocketEvent.GAME_SOCKET, "Please select a deck first!");
    else io.to(room).emit(SocketEvent.GAME_SOCKET, `${socket.user?.name} ${!state ? 'is not' : 'is'} ready`);
  }
}
