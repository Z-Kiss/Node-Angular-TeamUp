import express from "express";
import {handleError} from "../helpers";
import {getUserById, getUserBySessionToken} from "../db/user";
import {getRoomById} from "../db/gameRoom";

export const deleteRequestIsAuthorized = async (req: express.Request, res: express.Response, next: express.NextFunction) =>{
    try{

        const userId = req.identity._id;
        const isAdmin = req.identity.admin;
        const { id } = req.params;

        if(!id){
            return res.status(403).send('No Id provided').end();
        }

        const room: Record<string, any> = req.gameRoom;
        const user = await getUserById(id);

        let isOwner = false;

        if(user){
            if (id === userId.toString()){
                isOwner = true;
            }
        }else if(room){
            if(room.owner.toString() === userId.toString()){
                isOwner = true;
            }
        }

        if( isAdmin || isOwner ){
            return next();
        }else {
            return res.sendStatus(403);
        }
    }catch (error) {
        handleError(error, res)
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {

        const sessionToken = req.cookies['AUTH'];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.sendStatus(400);
        }

        req.identity = existingUser;

        return next();
    } catch (error) {
        handleError(error, res)
    }
}

export const isRoomExist = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).send('Id not provided').end();
        }

        const gameRoom = await getRoomById(id);

        if (!gameRoom) {
            return res.status(400).send('Room not exist');
        } else {
           req.gameRoom = gameRoom;
           req.gameRoomId = id;
        }
        return next();
    } catch (error) {
        handleError(error, res)
    }
}