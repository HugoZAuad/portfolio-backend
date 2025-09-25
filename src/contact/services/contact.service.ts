import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ContactDto } from '../DTO/contact.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContactService {
  constructor(private configService: ConfigService) {}

  async sendEmail(contact: ContactDto): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL || 'hugozeymer@gmail.com',
        pass: process.env.PASS_GMAIL || 'SECRETPASSWORD_MUDAR',
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await transporter.sendMail({
      from: contact.email,
      to: process.env.ADMIN_EMAIL,
      subject: `Nova mensagem de ${contact.name}`,
      text: contact.message,
    });
  }
}
