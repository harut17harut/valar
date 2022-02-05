import express from 'express';
const route = express.Router();
import { Ride } from '../controllers/ride.js';

route.get('/', Ride.index);
route.get('/data', Ride.getData);
route.get('/transactionlist', Ride.transactionList);
route.get('/richList/:address', Ride.richList);
export {
    route
}