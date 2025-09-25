// ARQUIVO: contact.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from '../services/contact.service';
import { ContactDto } from '../DTO/contact.dto';
import { Public } from 'shared/decorators/public.decorator';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public()
  @Post()
  handleContact(@Body() contactDto: ContactDto): { success: boolean } {
    this.contactService.sendEmail(contactDto).catch((error) => {
      console.error('Erro no envio de e-mail em segundo plano:', error);
    });
    return { success: true };
  }
}
