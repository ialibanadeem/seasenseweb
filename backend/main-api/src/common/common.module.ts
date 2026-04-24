import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { EmailService } from './email.service';
import { CoastlineService } from './coastline.service';

@Module({
  imports: [ConfigModule],
  providers: [PrismaService, EmailService, CoastlineService],
  exports: [PrismaService, EmailService, CoastlineService]
})
export class CommonModule { }
