// seedData.js

const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function to seed database with categories, subcategories, and products
async function seedDatabase() {
  const categoryNames = new Set();
  const subcategoryNames = new Set();
  const productNames = new Set();
  // Seed categories
  const categories = [];
  for (let i = 0; i < 5; i++) {
    let categoryName;
    do {
      categoryName = faker.commerce.department();
    } while (categoryNames.has(categoryName));
    categoryNames.add(categoryName);
    const category = await prisma.category.create({
      data: {
        name: categoryName,
      },
    });
    categories.push(category);
  }

  // Seed subcategories and products
  for (const category of categories) {
    for (let i = 0; i < 3; i++) {
      let subcategoryName;
      do {
        subcategoryName = faker.commerce.productAdjective();
      } while (subcategoryNames.has(subcategoryName));
      subcategoryNames.add(subcategoryName);
      const subcategory = await prisma.subcategory.create({
        data: {
          name: subcategoryName,
          categoryId: category.id,
        },
      });

      for (let j = 0; j < Math.floor(Math.random() * 100) + 100; j++) {
        let productName;
        do {
          productName = faker.commerce.productName();
        } while (productNames.has(productName));
        productNames.add(productName);

        await prisma.product.create({
          data: {
            name: productName,
            price: parseInt(faker.commerce.price({ min: 100 }), 10),
            weight: faker.number.int({ min: 100, max: 1000 }),
            brand: faker.company.name(),
            color: faker.color.human(),
            isNew: faker.datatype.boolean(),
            image: faker.image.url({ width: 400, height: 300 }),
            description: faker.commerce.productDescription(),
            stockQuantity: faker.number.int({ min: 1, max: 100 }),
            rating: faker.number.int({ min: 1, max: 5 }),
            manufacturer: faker.company.name(),
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
