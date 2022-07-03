import mongoose, { Document } from 'mongoose';
export declare type UsersDocument = Users & Document;
export declare class Users {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    refreshToken: string;
    requestSend: Users[];
    requestsFriends: Users[];
}
export declare const UsersSchema: mongoose.Schema<Users, mongoose.Model<Users, any, any, any>, {}, {}>;
