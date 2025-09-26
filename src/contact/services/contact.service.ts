// ARQUIVO: contact.service.ts
import { Injectable } from '@nestjs/common';
import { ContactDto } from '../DTO/contact.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ContactService {
  constructor(private configService: ConfigService) {}

  async sendEmail(contact: ContactDto): Promise<void> {
    const apiKey = this.configService.get<string>('BREVO_API_KEY');
    const adminEmail =
      this.configService.get<string>('ADMIN_EMAIL') ??
      'email-de-seguranca@hugozeymer.dev';
    const senderEmail =
      this.configService.get<string>('ADMIN_EMAIL') ?? 'contato@default.com';

    if (!apiKey) {
      throw new Error('BREVO_API_KEY não configurada.');
    }

    const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

    const emailData = {
      sender: { email: senderEmail, name: 'Portfólio Contato' },
      to: [{ email: adminEmail }],
      subject: `Nova Mensagem: ${contact.name}`,
      htmlContent: `
          <h3>Nova Mensagem de Contato</h3>
          <p><strong>Nome:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
          <p><strong>Mensagem:</strong></p>
          <p>${contact.message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: { email: contact.email, name: contact.name },
    };

    try {
      await axios.post(BREVO_API_URL, emailData, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
      });
    } catch (error) {
      console.error(
        'Falha no envio do e-mail:',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.response?.data || error.message,
      );
      throw new Error('Falha na comunicação com o serviço de e-mail.');
    }
  }
}
