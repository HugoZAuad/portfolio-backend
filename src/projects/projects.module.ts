import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsFindAllService } from './services/projects-find-all.service';
import { ProjectsFindOneService } from './services/projects-find-one.service';
import { ProjectsWriteService } from './services/projects-write.service';
import { AuthModule } from '../auth/auth.module';
import { ProjectsUpdateService } from './services/projects-update.service';
import { ProjectsDeleteService } from './services/projects-delete.service';
import { CloudinaryService } from './services/cloudinary.service';
import { FileContentMiddleware } from './middleware/file-content.middleware';

@Module({
  imports: [
    AuthModule,
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  controllers: [ProjectsController],
  providers: [
    ProjectsFindAllService,
    ProjectsFindOneService,
    ProjectsWriteService,
    ProjectsUpdateService,
    ProjectsDeleteService,
    CloudinaryService,
  ],
})
export class ProjectsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FileContentMiddleware)
      .forRoutes({ path: 'projects', method: RequestMethod.POST });
  }
}
