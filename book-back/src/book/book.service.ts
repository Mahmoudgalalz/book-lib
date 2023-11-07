import { Injectable, NotFoundException } from '@nestjs/common';
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

  async deleteBook(id: string) {
    const book = await this.prismaService.book.findUnique({
      where: {
        id,
      },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found.`);
    }

    const deletedBook = await this.prismaService.book.delete({
      where: {
        id,
      },
    });

    return deletedBook;
  }

  async searchBooksByTitle(title: string) {
    const books = await this.prismaService.book.findMany({
      where: {
        title: {
          contains: title, // Use "contains" for partial matches
          mode: 'insensitive', // Case-insensitive search
        },
      },
    });

    return books;
  }

  async filterBooksByYear(year: number) {
    const books = await this.prismaService.book.findMany({
      where: {
        publish_date: {
          gte: new Date(`${year}-01-01`), // Start of the year
          lte: new Date(`${year}-12-31`), // End of the year
        },
      },
    });

    return books;
  }

}