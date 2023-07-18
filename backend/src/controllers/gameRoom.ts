import express from "express";
import {createRoom, getAllRooms, getRoomById, getRoomsByUserId} from "../db/gameRoom";
import {handleError} from "../helpers";
import {get} from "lodash";
import mongoose from "mongoose";


export const createGameRoom = async (req: express.Request, res: express.Response) => {
    try {

        const {roomName} = req.body;

        if (!roomName) {
            return res.status(200).send('Missing information');
        }

        const owner: mongoose.Types.ObjectId = req.identity._id;

        const gameRoom = await createRoom({
            owner,
            roomName
        });


        return res.status(200).json(gameRoom);
    } catch (error) {
        handleError(error, res);
    }
}
export const joinGameRoom = async (req: express.Request, res: express.Response) => {
    try {

        const gameRoom = await getRoomById(req.gameRoomId).select('+members');

        const currentUserId: mongoose.Types.ObjectId = get(req, 'identity._id') as mongoose.Types.ObjectId;

        gameRoom.members.push(currentUserId);
        gameRoom.save();

        return res.status(200).json(gameRoom);
    } catch (error) {
        handleError(error, res);
    }
}
export const getAllGameRooms = async (req: express.Request, res: express.Response) => {
    try {

        const gameRooms = await getAllRooms();

        return res.status(200).json(gameRooms).end();
    } catch (error) {
        handleError(error, res);
    }
}

export const getOwnGameRooms = async (req: express.Request, res: express.Response) => {
    try {

        const currentUserId: mongoose.Types.ObjectId = get(req, 'identity._id') as mongoose.Types.ObjectId;

        const gameRooms = await getRoomsByUserId(currentUserId);

        return res.status(200).json(gameRooms).end()
    } catch (error) {
        handleError(error, res)
    }
}
export const deleteGameRoom = async (req: express.Request, res: express.Response) => {
    try {
        const deletedRoom = await getRoomById(req.gameRoomId);

        return res.status(200).json(deletedRoom)

    } catch (error) {
        handleError(error, res)
    }
}


// export const joinGameRoom = async (req: express.Request, res: express.Response) =>{
//     try{
//
//     }catch(error){
//         handleError(error, res)
//     }
// }
