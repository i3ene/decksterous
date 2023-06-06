import {User} from '../models/data/user.model';

declare module 'socket.io' {
  interface Socket {
    /**
     * User specific data
     */
    user?: User;
  }
}
