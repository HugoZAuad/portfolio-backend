import { Module } from '@nestjs/common';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsFindAllService } from './services/projects-find-all.service';
import { ProjectsFindOneService } from './services/projects-find-one.service';
import { ProjectsWriteService } from './services/projects-write.service';
import { AuthModule } from '../auth/auth.module';
import { ProjectsUpdateService } from './services/projects-update.service';
import { ProjectsDeleteService } from './services/projects-delete.service';

@Module({
  imports: [AuthModule],
  controllers: [ProjectsController],
  providers: [
    ProjectsFindAllService,
    ProjectsFindOneService,
    ProjectsWriteService,
    ProjectsUpdateService,
    ProjectsDeleteService,
  ],
})
export class ProjectsModule {}
