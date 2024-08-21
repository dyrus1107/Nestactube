"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const video_schema_1 = require("../model/video.schema");
const fs_1 = require("fs");
const path_1 = require("path");
let VideoService = class VideoService {
    constructor(videoModel) {
        this.videoModel = videoModel;
    }
    async createVideo(video) {
        const newVideo = new this.videoModel(video);
        return newVideo.save();
    }
    async readVideo(id) {
        if (id.id) {
            return this.videoModel
                .findOne({ _id: id.id })
                .populate('createdBy')
                .exec();
        }
        return this.videoModel.find().populate('createdBy').exec();
    }
    async streamVideo(id, response, request) {
        console.log(id);
        try {
            const data = await this.videoModel.findOne({ _id: id });
            if (!data) {
                throw new common_1.NotFoundException('Video Not Found');
            }
            const { range } = request.headers;
            if (range) {
                const { video } = data;
                const videoPath = (0, fs_1.statSync)((0, path_1.join)(process.cwd(), `./public/${video}`));
                const CHUNK_SIZE = 1 * 1e6;
                const start = Number(range.replace(/\D/g, ''));
                const end = Math.min(start + CHUNK_SIZE, videoPath.size - 1);
                const videoLength = end - start + 1;
                response.status(206);
                response.header({
                    'Content-Range': `bytes ${start}-${end}/${videoPath.size}`,
                    'Accept-Ranges': 'bytes',
                    'Content-length': videoLength,
                    'Content-Type': 'video/mp4',
                });
                const videoStream = (0, fs_1.createReadStream)((0, path_1.join)(process.cwd(), `./public/${video}`), { start, end });
                videoStream.pipe(response);
            }
            else {
                throw new common_1.NotFoundException('Range not found');
            }
        }
        catch (e) {
            console.error(e);
            throw new common_1.ServiceUnavailableException();
        }
    }
    async update(id, video) {
        return await this.videoModel.findByIdAndUpdate(id, video, { new: true });
    }
    async delete(id) {
        return this.videoModel.findByIdAndDelete(id);
    }
};
exports.VideoService = VideoService;
exports.VideoService = VideoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(video_schema_1.Video.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VideoService);
//# sourceMappingURL=video.service.js.map