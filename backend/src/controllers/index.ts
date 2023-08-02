import express from "express";
import authentication from './authentication'
import user from "./user";
import gameRoom from "./gameRoom";
import tag from "./tag";


const router = express.Router();

export default (): express.Router => {
    authentication(router);
    user(router);
    gameRoom(router);
    tag(router);
    return router;
}