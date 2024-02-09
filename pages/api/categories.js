// pages/api/categories.js

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const categoriesWithSubcategories = await prisma.category.findMany({
      include: {
        subcategories: true,
      },
    });

    // Format the response as JSON
    const formattedCategories = categoriesWithSubcategories.map((category) => ({
      id: category.id,
      name: category.name,
      subcategories: category.subcategories.map((subcategory) => ({
        id: subcategory.id,
        name: subcategory.name,
      })),
    }));

    res.status(200).json(formattedCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
