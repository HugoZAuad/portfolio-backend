import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [AuthModule, UserModule, ProjectsModule, SkillsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
