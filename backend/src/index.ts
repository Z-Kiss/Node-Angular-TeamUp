import express from "express";
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from "./router";
import {schema} from './env';
import { load } from 'ts-dotenv';
const env = load(schema, './src/.env');

const app = express();

declare module 'express' {
    export interface Request {
        gameRoom?: Record<string, any>,
        gameRoomId?: string,
        identity?: Record<string, any>
    }
}

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () =>{
    console.log('Server running on http://localhost:8080')
})

mongoose.Promise = Promise;
mongoose.connect(env.MONGO_URL);
mongoose.connection.on('error',(error: Error) => console.log(error))

app.use('/', router())
