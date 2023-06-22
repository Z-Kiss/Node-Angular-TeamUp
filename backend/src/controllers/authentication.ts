import express from "express";
import {createUser, getUserByEmail} from "../db/user";
import {hashGenerator, saltGenerator, handleError} from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
    try{
        const {email, password} = req.body;

        if (!email || !password){
            return res.status(400).send('No email or password provided');
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if(!user){
            return res.status(400).send('Email not registered');
        }

        const expectedHash = hashGenerator(user.authentication.salt, password)

        if(user.authentication.password !== expectedHash){
            return res.status(403).send('Not matching email/password');
        }

        const salt = saltGenerator();
        user.authentication.sessionToken = hashGenerator(salt, user._id.toString());

        await user.save();
        res.cookie('AUTH', user.authentication.sessionToken, {domain: 'localhost', path: '/'})

        return res.status(200).json(user).end()
    }catch (error){
       handleError(error, res)
    }
}


export const register = async(req: express.Request, res: express.Response) =>{
    try{
        const {email, password, username} = req.body;

        if(!email || !password || !username){
            return res.status(400).send('No email/password/username provided');
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.status(400).send('Email already in registered');
        }

        const salt = saltGenerator();
        const user = await createUser({
            email,
            username,
            authentication:{
                salt,
                password: hashGenerator(salt, password),
            }
        })

        return res.status(200).json(user).end();
    }catch (error){
        handleError(error, res)
    }
}