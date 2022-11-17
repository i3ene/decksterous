import * as express from 'express';
import { User } from '../models/data/user.model';
import { Data } from '../models/object/data.express';

declare module 'express' {
  interface Request {
    /**
     * User specific data
     */
    user?: User;

    /**
     * General data for processing
     */
    data?: Data & any;
  }
}
