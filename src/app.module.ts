import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { BooksModule } from './book/book.module';

@Module({
  imports: [BooksModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
