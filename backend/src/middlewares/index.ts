import express from "express";
import {merge} from 'lodash';
import {handleError} from "../helpers";
import {getUserBySessionToken} from "../db/user";


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
