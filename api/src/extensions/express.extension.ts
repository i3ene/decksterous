import * as express from 'express';
import { User } from '../models/data/user.model';

declare module 'express' {
    interface Request {
        user?: User;
    }
}