import express from 'express';
const route = express.Router();
import { Super } from '../controllers/super.js';

route.get('/', Super.index);
route.get('/data', Super.getData);
route.get('/transactionlist', Super.transactionList);
route.get('/richList/:address', Super.richList);
export {
    route
}