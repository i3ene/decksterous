import express from 'express';
import {AuthMiddleware} from '../middleware/auth.middleware';
import {HeaderMiddleware} from '../middleware/header.middleware';
import {AuthRoutes} from '../routes/auth.routes';
import {UserRoutes} from '../routes/user.routes';
import {CardRoutes} from "../routes/card.routes";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(HeaderMiddleware.handler);

app.use('/auth', AuthRoutes);

app.use(AuthMiddleware.verifyToken);
app.use('/user', UserRoutes);

app.use('/card', CardRoutes);
