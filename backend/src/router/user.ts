import express from "express";

import {deleteUser, findUserById, getAllUsers} from "../controllers/user";
import {deleteRequestIsAuthorized, isAuthenticated} from "../middlewares";

export default (router: express.Router) =>{
    router.use('/user',isAuthenticated)
    router.get('/user/all', getAllUsers)
    router.get('/user/find/:id', findUserById)
    router.delete('/user/:id', deleteRequestIsAuthorized, deleteUser)
};