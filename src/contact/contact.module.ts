import { Module } from '@nestjs/common';
import { ContactController } from './controllers/contact.controller';
import { ContactService } from './services/contact.service';
import { ConfigModule } from '@nestjs/config'; // Importe o ConfigModule

@Module({
  imports: [ConfigModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
