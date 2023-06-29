import express from "express";
import {isAuthenticated} from "../middlewares";
import {
    createTagForGames,
    createTagForRooms,
    getAllTagsOfGames,
    getAllTagsOfRooms
} from "../controllers/tag";

export default (router: express.Router) =>{
    router.use('/tag',isAuthenticated);
    router.get('/tag/game/get-all-tags', getAllTagsOfGames);
    router.get('/tag/room/get-all-tags', getAllTagsOfRooms);
    router.post('/tag/game/create', createTagForGames);
    router.post('/tag/room/create', createTagForRooms);
}