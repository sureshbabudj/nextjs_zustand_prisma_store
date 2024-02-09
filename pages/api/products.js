// pages/api/products.js

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { categories, subcategories, page = 1, size = 10 } = req.query;

    // Convert categories and subcategories to arrays if they are provided as comma-separated strings
    const categoryIds = categories ? categories.split(",") : [];
    const subcategoryIds = subcategories ? subcategories.split(",") : [];

    // Parse page and size as integers
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(size, 10);

    // Calculate the offset based on the page number and size
    const offset = (pageNumber - 1) * pageSize;

    // Construct the where clause based on the provided categories and subcategories
    const whereClause = {};
    if (categoryIds.length > 0 || subcategoryIds.length > 0) {
      whereClause.OR = [];
      if (categoryIds.length > 0) {
        whereClause.OR.push({ categoryId: { in: categoryIds } });
      }
      if (subcategoryIds.length > 0) {
        whereClause.OR.push({ subcategoryId: { in: subcategoryIds } });
      }
    }

    // Query products based on categories and subcategories
    const products = await prisma.product.findMany({
      where: whereClause,
      take: pageSize, // Number of products per page
      skip: offset,
    });

    // Query total count of products without pagination
    const totalCount = await prisma.product.count({
      where: whereClause,
    });

    res.status(200).json({ products, totalCount });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
