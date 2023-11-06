import { BadRequestException, Body, Controller, Post, Get } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from '@prisma/client';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('')
  async createBook(
    @Body() bookData: CreateBookDto,
  ): Promise<Book | null> {
    try {
      const {title,author,description} = bookData
      const books = await this.bookService.createBook({
        title,
        author,
        description,
        publish_date: new Date(bookData.publish_date)
      });
      return books;
    } catch (err) {
      throw new BadRequestException('Failed to create a book', {
        cause: err,
        description: err,
      });
    }
  }

  @Get('')
  async listBooks(): Promise<Book[] | null> {
    try {
      const book = await this.bookService.listBooks();
      return book;
    } catch (err) {
      throw new BadRequestException('Failed to return the books', {
        cause: err,
        description: err,
      });
    }
  }
}
