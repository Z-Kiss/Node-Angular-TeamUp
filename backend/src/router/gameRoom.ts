import express from "express";

import {isAuthenticated, isAuthorized} from "../middlewares";

import {
    createGameRoom,
    deleteGameRoom,
    getAllGameRooms,
    getGameRoomById,
    getOwnGameRooms,
    joinGameRoom
} from "../controllers/gameRoom";

export default (router: express.Router) =>{
    router.get('/game-room/all',isAuthenticated, getAllGameRooms)
    router.get('/game-room/get-room-by-id/:id',isAuthenticated, getGameRoomById)
    router.get('/game-room/join/:gameRoomId', isAuthenticated, joinGameRoom)
    router.post('/game-room/create', isAuthenticated, createGameRoom)
    router.get('/game-room/own-rooms', isAuthenticated, getOwnGameRooms)
    router.delete('/game-room/:id', isAuthenticated, isAuthorized, deleteGameRoom)
}