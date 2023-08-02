import express from "express";

import {deleteRequestIsAuthorized, isAuthenticated, isRoomExist} from "../middlewares";

import {
    createGameRoom,
    deleteGameRoom,
    getAllGameRooms,
    getOwnGameRooms,
    joinGameRoom
} from "../services/gameRoom";


export default (router: express.Router) => {
    router.use("/game-room", isAuthenticated);

    router.get('/game-room/all', getAllGameRooms)
    router.get('/game-room/:id', isRoomExist, (req: express.Request, res: express.Response) => res.json(req.gameRoom))
    router.patch('/game-room/:id/join', isRoomExist, joinGameRoom)
    router.post('/game-room', createGameRoom)
    router.get('/game-room/own-rooms', getOwnGameRooms)
    router.delete('/game-room/:id', isRoomExist, deleteRequestIsAuthorized, deleteGameRoom)
}
