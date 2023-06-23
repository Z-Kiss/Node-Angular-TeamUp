import express from "express";
import {deleteUserById, getUserById, getUsers} from "../db/user";
import {handleError} from "../helpers";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users).end();
    } catch (error) {
        handleError(error, res);
    }
}

export const findUserById = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.body;

        if (!id) {
            return res.status(400).send('No Id provided')
        }

        const user = await getUserById(id)

        return res.status(200).json(user).end()
    } catch (error) {
        handleError(error, res);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) =>{
    try{
        const {id} = req.params;

        const deletedUser = await deleteUserById(id);

        if(!deletedUser){
            return res.send('No user Found')
        }else {
            return res.status(200).json(deletedUser)
        }
    }catch(error){
        handleError(error, res)
    }
}