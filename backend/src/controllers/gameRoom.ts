import express from "express";
import {createRoom, getAllRooms, getRoomById, getRoomsByUserId} from "../db/gameRoom";
import {handleError} from "../helpers";
import {get} from "lodash";
import mongoose from "mongoose";


export const createGameRoom = async (req: express.Request, res: express.Response) => {
    try {
        const {roomName} = req.body;

        if(!roomName){
            return res.status(200).send('Missing information');
        }

        const gameRoom = await createRoom({
            roomName
        });


        return res.status(200).json(gameRoom);
    } catch (error) {
        handleError(error, res);
    }
}
export const joinGameRoom = async (req: express.Request, res: express.Response) => {
    try {
        const gameRoomId: string = req.params.gameRoomId;

        if (!gameRoomId) {
            return res.status(400).send('Missing gameRoomId');
        }
        const gameRoom = await getRoomById(gameRoomId).select('+members');

        const currentUserId = get(req, 'identity._id') as mongoose.Types.ObjectId;

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

export const getGameRoomById = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).send('Id not provided').end();
        }

        const gameRoom = await getRoomById(id);

        if (!gameRoom) {
            return res.status(400).send('Room not exist');
        } else {
            return res.status(200).json(gameRoom).end();
        }
    } catch (error) {
        handleError(error, res);
    }
}

export const getOwnGameRooms = async (req: express.Request, res: express.Response) =>{
    try{

        const currentUserId = get(req, 'identity._id') as mongoose.Types.ObjectId;

        const gameRooms = await getRoomsByUserId(currentUserId);

        return res.status(200).json(gameRooms).end()
    }catch(error){
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
