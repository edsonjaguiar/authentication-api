import dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
const app: Express = express();

import cors from 'cors';
import morgan from 'morgan';
import { connectionMongodb } from './config/database';
import { router } from './routes';

const PORT = process.env.PORT || 3333;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    connectionMongodb();
});
