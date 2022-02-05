import express from 'express';
const routes = express.Router();
import { route as ride } from './ride.js';
import { route as iset } from './iset.js';
import { route as aero } from './aero.js';
import { route as superr } from './super.js';

routes.use('/ride', ride);
routes.use('/iset', iset);
routes.use('/aero', aero);
routes.use('/super', superr);
export { routes }