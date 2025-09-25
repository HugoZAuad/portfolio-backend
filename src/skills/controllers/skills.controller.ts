import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { SkillsFindAllService } from '../services/skills-find-all.service';
import { SkillsFindOneService } from '../services/skills-find-one.service';
import { SkillsWriteService } from '../services/skills-write.service';
import { SkillsUpdateService } from '../services/skills-update.service';
import { SkillsDeleteService } from '../services/skills-delete.service';
import { CreateSkillDto } from '../DTO/create-skill.dto';
import { UpdateSkillDto } from '../DTO/update-skill.dto';
import { SkillWithLevel } from '../interface/skills.interface';
import { SkillResponse } from '../interface/skill-response.interface';
import { Public } from 'shared/decorators/public.decorator';

@Controller('skills')
export class SkillsController {
  constructor(
    private readonly skillsFindAllService: SkillsFindAllService,
    private readonly skillsFindOneService: SkillsFindOneService,
    private readonly skillsWriteService: SkillsWriteService,
    private readonly skillsUpdateService: SkillsUpdateService,
    private readonly skillsDeleteService: SkillsDeleteService,
  ) {}

  @Public()
  @Get()
  async findAll(): Promise<SkillWithLevel[]> {
    return this.skillsFindAllService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SkillWithLevel> {
    return this.skillsFindOneService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createSkillDto: CreateSkillDto): Promise<SkillResponse> {
    return this.skillsWriteService.create(createSkillDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ): Promise<SkillWithLevel> {
    return this.skillsUpdateService.update(+id, updateSkillDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.skillsDeleteService.delete(+id);
  }
}
