import {Schema, model} from "mongoose";
import {ObjectId} from "mongodb";

const GameRoomSchema = new Schema({
    owner:{type: Schema.Types.ObjectId, ref:'User', required: true},
    roomName: {type: String, required: true},
    gameTags: [{type: String}],
    roomTags: [{type: String}],
    members:[{type: Schema.Types.ObjectId, ref: 'User',  select: false}],

})

export const GameRoomModel = model('GameRoom', GameRoomSchema);
export const createRoom = (values: Record<string, any>) => new GameRoomModel(values).save()
    .then((room) => room.toObject());
export const getAllRooms = () => GameRoomModel.find();
export const getRoomById = (id: String) => GameRoomModel.findById({_id: id});
export const getRoomsByUserId = (id: ObjectId) => GameRoomModel.find({owner: id});
export const getRoomsByGameTag = (tag: string) => GameRoomModel.find({gameTags: tag});
export const getRoomsByGameTags = (tag: [string]) => GameRoomModel.find({gameTags: { $all: tag}});
export const getRoomsByRoomTag = (tag: string) => GameRoomModel.find({roomTags: tag});
export const getRoomsByRoomTags = (tag: [string]) => GameRoomModel.find({roomTags: { $all: tag}});

// add functions as static to schema or method to model
