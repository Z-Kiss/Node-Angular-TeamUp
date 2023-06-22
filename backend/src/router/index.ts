import express from "express";
import authentication from './authentication'
import user from "./user";
import gameRoom from "./gameRoom";

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    user(router);
    gameRoom(router);
    return router;
}