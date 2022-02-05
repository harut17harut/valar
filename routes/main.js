import express from 'express';
const route = express.Router();
import { Main } from '../controllers/main.js';

route.get('/', Main.main);

export {
    route
}