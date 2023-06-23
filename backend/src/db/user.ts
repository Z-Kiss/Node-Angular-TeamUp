import {Schema, model} from "mongoose";

const UserSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    authentication: {
        password: {type: String, select: false},
        salt: {type: String, select: false},
        sessionToken: {type: String, select: false},
    },
    admin:{type: Boolean, default: false},
})

UserSchema.index({ username: 1, email: 1 }, { unique: true });

//TODO ask for help about unique
export const UserModel = model('User', UserSchema)

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({email});
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({'authentication.sessionToken': sessionToken})
export const getUserById = (id: string) => UserModel.findById({_id: id})
export const createUser = (values: Record<string, any>) => new UserModel(values).save()
    .then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id: id});
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)