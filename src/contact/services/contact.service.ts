// ARQUIVO: contact.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { ContactDto } from '../DTO/contact.dto';

@Injectable()
export class ContactService {
  private resend: Resend;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    this.resend = new Resend(apiKey);
  }

  async sendEmail(contact: ContactDto): Promise<void> {
    const adminEmail =
      this.configService.get<string>('ADMIN_EMAIL') ??
      'email-de-seguranca@hugozeymer.dev';
    const sendingDomain =
      this.configService.get<string>('RESEND_SENDING_DOMAIN') ?? 'resend.dev';

    const fromAddress = `Portfólio Contato <contato@${sendingDomain}>`;
    const htmlContent = `
        <html>
            <body style="font-family: sans-serif; line-height: 1.6;">
                <h2>Nova Mensagem de Contato</h2>
                <p><strong>Nome:</strong> ${contact.name}</p>
                <p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
                <h3>Mensagem:</h3>
                <p style="white-space: pre-wrap; padding: 10px; border-left: 3px solid #007bff; background-color: #f8f9fa;">${contact.message}</p>
            </body>
        </html>
    `;

    const textContent = `
        Nova Mensagem de Contato
        Nome: ${contact.name}
        Email: ${contact.email}
        Mensagem:
        ${contact.message}
    `;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await this.resend.emails.send({
        from: fromAddress,
        to: adminEmail, // Agora o tipo é string, resolvendo o erro
        subject: `Nova Mensagem: ${contact.name}`,
        html: htmlContent,
        text: textContent,
        replyTo: contact.email,
      });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error('Falha no envio do e-mail com Resend:', error.message);
      throw new Error('Falha na comunicação com o serviço de e-mail.');
    }
  }
}
