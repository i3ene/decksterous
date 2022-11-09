import * as express from 'express';
import { User } from '../models/data/user.model';

declare module 'express' {
  interface Request {
    /**
     * User specific data
     */
    user?: User;

    /**
     * General data for processing
     */
    data?: { messages: string[] } & any;
  }
}
