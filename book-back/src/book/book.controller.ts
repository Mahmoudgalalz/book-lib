import { BadRequestException, Body, Controller, Post, Get, Query, Delete, NotFoundException, Param } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from '@prisma/client';

@Controller('books')
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

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    try {
      const deletedBook = await this.bookService.deleteBook(id);
      if (!deletedBook) {
        throw new NotFoundException(`Book with ID ${id} not found.`);
      }
      return 'Book deleted successfully';
    } catch (err) {
      throw new BadRequestException('Failed to delete the book', {
        cause: err,
        description: err,
      });
    }
  }

  @Get('search')
  async searchBooksByTitle(@Query('title') title: string) {
    const books = await this.bookService.searchBooksByTitle(title);
    return books;
  }

  @Get('filter-by-year')
  async filterBooksByYear(@Query('year') year: number) {
    const books = await this.bookService.filterBooksByYear(year);
    return books;
  }

  @Get('')
  async listBooks(
    @Query('title') title: string,
    @Query('year') year: number,
  ): Promise<Book[] | null> {
    try {
      let books: Book[] | null = await this.bookService.listBooks();
      
      if (books) {
        if (title) {
          books = books.filter((book) =>
            book.title.toLowerCase().includes(title.toLowerCase())
          );
        }
        if (year) {
          books = books.filter((book) => new Date(book.publish_date).getFullYear() === year);
        }
      }

      return books;
    } catch (err) {
      throw new BadRequestException('Failed to return the books', {
        cause: err,
        description: err,
      });
    }
  }
}
