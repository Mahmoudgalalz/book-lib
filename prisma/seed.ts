import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed authors
  const authors = [
    {
      id: '1',
      name: 'J.K. Rowling',
      bio: 'British author known for the Harry Potter series',
    },
    {
      id: '2',
      name: 'George R.R. Martin',
      bio: 'American author famous for A Song of Ice and Fire series',
    },
    {
      id: '3',
      name: 'Stephen King',
      bio: 'Renowned American author of horror, supernatural fiction, and suspense',
    },
  ];

  await prisma.author.createMany({
    data: authors,
  });

  // Seed books
  const books = [
    {
      id: '1',
      title: "Harry Potter and the Sorcerer's Stone",
      author_id: '1',
      publish_date: new Date('1997-06-26'),
      description: 'The first book in the Harry Potter series',
    },
    {
      id: '2',
      title: 'A Game of Thrones',
      author_id: '2',
      publish_date: new Date('1996-08-06'),
      description: 'The first book in A Song of Ice and Fire series',
    },
    {
      id: '3',
      title: 'It',
      author_id: '3',
      publish_date: new Date('1986-09-15'),
      description: 'A horror novel by Stephen King',
    },
  ];

  await prisma.book.createMany({
    data: books,
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
