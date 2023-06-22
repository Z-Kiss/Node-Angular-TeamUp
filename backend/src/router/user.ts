import express from "express";

import {findUserById, getAllUsers} from "../controllers/user";
import {isAuthenticated} from "../middlewares";

export default (router: express.Router) =>{
    router.get('/users',isAuthenticated, getAllUsers)
    router.post('/find-user', isAuthenticated, findUserById)
};