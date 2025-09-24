import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from '../services/contact.service';
import { ContactDto } from '../DTO/contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async handleContact(
    @Body() contactDto: ContactDto,
  ): Promise<{ success: boolean }> {
    await this.contactService.sendEmail(contactDto);
    return { success: true };
  }
}
