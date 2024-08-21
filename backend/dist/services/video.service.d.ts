import { Model } from 'mongoose';
import { Video, VideoDocument } from '../model/video.schema';
import { Request, Response } from 'express';
export declare class VideoService {
    private videoModel;
    constructor(videoModel: Model<VideoDocument>);
    createVideo(video: Object): Promise<Video>;
    readVideo(id: any): Promise<any>;
    streamVideo(id: string, response: Response, request: Request): Promise<void>;
    update(id: any, video: Video): Promise<Video>;
    delete(id: any): Promise<any>;
}
