import express from 'express';
const route = express.Router();
import { Iset } from '../controllers/iset.js';

route.get('/', Iset.index);
route.get('/data', Iset.getData);
route.get('/transactionlist', Iset.transactionList);
route.get('/richList/:address', Iset.richList);
export {
    route
}