import { Module } from '@nestjs/common';
import { SkillsController } from './controllers/skills.controller';
import { SkillsFindAllService } from './services/skills-find-all.service';
import { SkillsFindOneService } from './services/skills-find-one.service';
import { SkillsWriteService } from './services/skills-write.service';
import { AuthModule } from '../auth/auth.module';
import { SkillsUpdateService } from './services/skills-update.service';
import { SkillsDeleteService } from './services/skills-delete.service';

@Module({
  imports: [AuthModule],
  controllers: [SkillsController],
  providers: [
    SkillsFindAllService,
    SkillsFindOneService,
    SkillsWriteService,
    SkillsUpdateService,
    SkillsDeleteService,
  ],
})
export class SkillsModule {}
