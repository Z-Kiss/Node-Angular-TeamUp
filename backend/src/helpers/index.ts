import crypto from "crypto";
import express from "express";

const SECRET_KEY = 'l6RXpN5zR5V1G8fEXZbsafdCX5DvC0i9';

export const saltGenerator = () =>crypto.randomBytes(128).toString('base64')

export const hashGenerator = (salt: string, password: string)=> {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET_KEY).digest('hex')
};

export const handleError = (error: Error, res: express.Response) =>{
    console.log(error);
    return res.sendStatus(400);
}