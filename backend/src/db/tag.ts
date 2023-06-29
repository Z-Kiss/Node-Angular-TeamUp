import {model, Schema} from "mongoose";



const TagsSchema = new Schema({
    tagName:{type: String, required: true, unique: true},
    type:{enum:['GAME', 'ROOM']}
})

export const TagModel = model('Tag', TagsSchema);

export const createTag = (values: Record<string, any>) => new TagModel(values).save()
    .then((tag) => tag.toObject());

export const getAllTags = () => TagModel.find();
export const getAllGameTags = () => TagModel.find({type:'GAME'});
export const getAllRoomTags = () => TagModel.find({type:'ROOM'});
export const getGameTagByName = (tagName: string) => TagModel.findOne({tagName: tagName, type:'GAME'});
export const getRoomTagByName = (tagName: string) => TagModel.findOne({tagName: tagName, type:'ROOM'});