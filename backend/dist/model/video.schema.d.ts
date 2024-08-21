import mongoose from 'mongoose';
import { User } from './user.schema';
export type VideoDocument = Video & Document;
export declare class Video {
    title: string;
    video: string;
    coverImage: string;
    uploadDate: Date;
    createdBy: User;
}
export declare const VideoSchema: mongoose.Schema<Video, mongoose.Model<Video, any, any, any, mongoose.Document<unknown, any, Video> & Video & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Video, mongoose.Document<unknown, {}, mongoose.FlatRecord<Video>> & mongoose.FlatRecord<Video> & {
    _id: mongoose.Types.ObjectId;
}>;
