import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ContactDto } from '../DTO/contact.dto';

@Injectable()
export class ContactService {
  async sendEmail(contact: ContactDto): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hugozeymer@gmail.com',
        pass: 'frtu tjtm vkez hggf',
      },
    });

    await transporter.sendMail({
      from: contact.email,
      to: 'hugozeymer@gmail.com',
      subject: `Nova mensagem de ${contact.name}`,
      text: contact.message,
    });
  }
}
