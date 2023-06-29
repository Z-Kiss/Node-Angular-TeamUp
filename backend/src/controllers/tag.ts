import express from "express";
import {handleError} from "../helpers";
import {createTag, getAllGameTags, getAllRoomTags, getAllTags, getGameTagByName, getRoomTagByName} from "../db/tag";

export const getAllTagsOfGames = async (req: express.Request, res: express.Response) =>{
    try{
        const tags = await getAllGameTags();

        return res.status(200).json(tags).end();
    }catch(error){
        handleError(error, res);
    }
}

export const createTagForGames = async (req: express.Request, res: express.Response) =>{
    try{
        const { tagName } = req.body;

        if(!tagName){
            return res.status(400).send('Missing tag name').end();
        }

        const existingTag = await getGameTagByName(tagName);

        if(existingTag){
            return res.status(500).send('Tag already exist').end();
        }

        const gameTag = await createTag({tagName, type:'GAME'});

        return res.status(200).json(gameTag).end();
    }catch(error){
        handleError(error, res);
    }
}


export const getAllTagsOfRooms = async (req: express.Request, res: express.Response) =>{
    try{
        const tags = await getAllRoomTags();

        return res.status(200).json(tags).end();
    }catch(error){
        handleError(error, res);
    }
}

export const createTagForRooms = async (req: express.Request, res: express.Response) =>{
    try{
        const { tagName } = req.body;

        if(!tagName){
            return res.status(400).send('Missing tag name').end();
        }

        const existingTag = await getRoomTagByName(tagName);
        if(existingTag){
            return res.status(500).send('Tag already exist').end();
        }

        const roomTag = await createTag({tagName, type:'ROOM'});

        return res.status(200).json(roomTag).end();
    }catch(error){
        handleError(error, res);
    }
}

export const getTagsOfRoomAndGame = async (req: express.Request, res: express.Response) =>{
    try{
        const allTags = await getAllTags()

        return res.status(200).json(allTags);
    }catch(error){
        handleError(error, res)
    }
}
