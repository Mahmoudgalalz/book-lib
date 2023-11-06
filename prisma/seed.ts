import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed books
  const books = [
    {
      id: '1',
      title: "Harry Potter and the Sorcerer's Stone",
      author: 'J.K. Rowling',
      publish_date: new Date('1997-06-26'),
      description: 'The first book in the Harry Potter series',
    },
    {
      id: '2',
      title: 'A Game of Thrones',
      author: 'George R.R. Martin',
      publish_date: new Date('1996-08-06'),
      description: 'The first book in A Song of Ice and Fire series',
    },
    {
      id: '3',
      title: 'It',
      author: 'Stephen King',
      publish_date: new Date('1986-09-15'),
      description: 'A horror novel by Stephen King',
    },
  ];

  for (const bookData of books) {
    await prisma.book.create({
      data: bookData,
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
