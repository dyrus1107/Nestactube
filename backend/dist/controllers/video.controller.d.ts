import { Video } from '../model/video.schema';
import { Response } from 'express';
import { VideoService } from 'src/services/video.service';
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    createBook(response: Response, request: any, video: Video, files: {
        video?: Express.Multer.File[];
        cover?: Express.Multer.File[];
    }): Promise<Response<any, Record<string, any>>>;
    read(id: any): Promise<Object>;
    stream(id: any, response: any, request: any): Promise<void>;
    update(response: any, id: any, video: Video): Promise<any>;
    delete(response: any, id: any): Promise<any>;
}
