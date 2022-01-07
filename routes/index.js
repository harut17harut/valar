
import express from 'express';
const routes = express.Router();
import { route as main } from './main.js';

routes.use('/', main);

export { routes } 
