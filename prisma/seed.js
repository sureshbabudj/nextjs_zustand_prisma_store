// seedData.js

const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function to seed database with categories, subcategories, and products
async function seedDatabase() {
  // Seed categories
  const categories = [];
  for (let i = 0; i < 5; i++) {
    const category = await prisma.category.create({
      data: {
        name: faker.commerce.department(),
      },
    });
    categories.push(category);
  }

  // Seed subcategories and products
  for (const category of categories) {
    for (let i = 0; i < 3; i++) {
      const subcategory = await prisma.subcategory.create({
        data: {
          name: faker.commerce.productMaterial(),
          categoryId: category.id,
        },
      });

      for (let j = 0; j < Math.floor(Math.random() * 100) + 100; j++) {
        await prisma.product.create({
          data: {
            name: faker.commerce.productName(),
            price: faker.number.float({ min: 1, max: 1000 }),
            weight: faker.number.float({ min: 100, max: 1000 }),
            brand: faker.company.name(),
            color: faker.color.human(),
            isNew: faker.datatype.boolean(),
            categoryId: category.id,
            subcategoryId: subcategory.id,
          },
        });
      }
    }
  }
}

// Call the seed function
seedDatabase()
  .then(() => {
    console.log("Database seeded successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  });
