import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path/posix';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { User, UserSchema } from './model/user.schema';
import { Video, VideoSchema } from './model/video.schema';
import { VideoController } from './controllers/video.controller';
import { UserController } from './controllers/user.controller';
import { VideoService } from './services/video.service';
import { UserService } from './services/user.service';
import { isAuthenticated } from './app.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/Stream'),
    MulterModule.register({
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const ext = file.mimetype.split('/')[1];
          cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
        },
      }),
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    JwtModule.register({
      secret: 'super-secret',
      signOptions: { expiresIn: '2h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController, VideoController, UserController],
  providers: [AppService, VideoService, UserService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .exclude({
        path: 'api/v1/video/:id',
        method: RequestMethod.GET,
      })
      .forRoutes(VideoController);
  }
}
