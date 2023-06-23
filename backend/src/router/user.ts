import express from "express";

import {deleteUser, findUserById, getAllUsers} from "../controllers/user";
import {isAuthenticated, isAuthorized} from "../middlewares";

export default (router: express.Router) =>{
    router.get('/user/all',isAuthenticated, getAllUsers)
    router.get('/user/find/:id', isAuthenticated, findUserById)
    router.delete('/user/:id', isAuthenticated, isAuthorized, deleteUser)
};