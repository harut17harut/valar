import express from 'express';
const route = express.Router();
import { Aero } from '../controllers/aero.js';

route.get('/', Aero.index);
route.get('/data', Aero.getData);
route.get('/transactionlist', Aero.transactionList);
route.get('/richList/:address', Aero.richList);
export {
    route
}