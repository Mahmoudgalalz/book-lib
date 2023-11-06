import { Injectable } from '@nestjs/common';
import { Book, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BookService {
  constructor(private prismaService: PrismaService) {}

  async listBooks(): Promise<Book[] | null> {
    return this.prismaService.book.findMany();
  }

  async createBook(data: Prisma.BookCreateInput): Promise<Book> {
    return this.prismaService.book.create({
      data
    });
  }

}