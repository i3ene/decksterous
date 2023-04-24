import { Server, Socket } from 'socket.io';
import { RoomSocket } from '../socket/room.socket';
import { Game } from '../models/object/game.object';
import { GamePlayer } from '../models/object/game.model';
import { FrontendAction, RoomAction, RoomSocketEvent, SocketAction } from '../models/object/socket.model';

export namespace GameController {
  export const games: Map<string, Game> = new Map();

  export async function join(io: Server, socket: Socket, room: string) {
    socket.join(room);
    socket.emit(SocketAction.GAME_SOCKET_JOIN, new RoomSocketEvent(socket.id, room, RoomAction.JOIN));
    io.to(room).emit(SocketAction.GAME_SOCKET, new RoomSocketEvent(socket.id, room, RoomAction.JOIN))

    joinEvents(io, socket, room);
  }

  export async function leave(io: Server, socket: Socket, room: string) {
    socket.emit(SocketAction.GAME_SOCKET_LEAVE, new RoomSocketEvent(socket.id, room, RoomAction.LEAVE));
    io.to(room).emit(SocketAction.GAME_SOCKET, new RoomSocketEvent(socket.id, room, RoomAction.LEAVE))
    socket.leave(room);

    leaveEvents(io, socket);
  }

  export function joinEvents(io: Server, socket: Socket, room: string) {
    socket.on(SocketAction.GAME_SERVER, async (event) => {
      actionEvent(io, socket, room, event);
    });
  }

  export function leaveEvents(io: Server, socket: Socket) {
    socket.removeAllListeners(SocketAction.GAME_SERVER);
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
      case 'test':
        socket.emit(SocketAction.GAME_SOCKET, { players: games.get(room)?.players.map.size });
        break;
    }
  }
}
