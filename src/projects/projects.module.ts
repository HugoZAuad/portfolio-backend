import { Module } from '@nestjs/common';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsReadService } from './services/projects-read.service';
import { ProjectsWriteService } from './services/projects-write.service';
import { AuthModule } from '../auth/auth.module';
import { ProjectsUpdateService } from './services/projects-update.service';
import { ProjectsDeleteService } from './services/projects-delete.service';

@Module({
  imports: [AuthModule],
  controllers: [ProjectsController],
  providers: [
    ProjectsReadService,
    ProjectsWriteService,
    ProjectsUpdateService,
    ProjectsDeleteService,
  ],
})
export class ProjectsModule {}
