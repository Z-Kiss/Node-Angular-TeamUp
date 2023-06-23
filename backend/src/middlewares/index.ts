import express from "express";
import {get, merge} from 'lodash';
import {handleError} from "../helpers";
import {getUserById, getUserBySessionToken} from "../db/user";

import {ObjectId} from "mongodb";
import {getRoomById} from "../db/gameRoom";

export const isAuthorized = async (req: express.Request, res: express.Response, next: express.NextFunction) =>{
    try{

        const userId = get(req, 'identity._id') as ObjectId;
        const isAdmin = get(req, 'identity.admin') as Boolean;
        const { id } = req.params;

        if(!id){
            return res.status(403).send('No Id provided').end();
        }

        const room = await getRoomById(id);
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

        return next();
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

        merge(req, {identity: existingUser});

        return next();
    } catch (error) {
        handleError(error, res)
    }
}
