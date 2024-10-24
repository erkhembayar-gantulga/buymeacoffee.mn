const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create seed data
  const user1 = await prisma.user.upsert({
    where: { email: 'johndoe@example.com' },
    update: {},
    create: {
      email: 'johndoe@example.com',
      name: 'John Doe',
      username: 'johndoe',
      bio: 'Passionate photographer capturing the beauty of Mongolia.',
      profileImage: '/images/johndoe-profile.jpg',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'sarahsmith@example.com' },
    update: {},
    create: {
      email: 'sarahsmith@example.com',
      name: 'Sarah Smith',
      username: 'sarahsmith',
      bio: 'Nomadic lifestyle blogger exploring the traditions of Mongolia.',
      profileImage: '/images/sarahsmith-profile.jpg',
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
