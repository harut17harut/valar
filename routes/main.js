import express from 'express';
const route = express.Router();
import { Main } from '../controllers/Main.js';

route.get('/', Main.index);
route.get('/data', Main.getData);
route.get('/richList/:address', Main.richList);
export {
    route
}