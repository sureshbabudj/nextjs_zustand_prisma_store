/*
  Warnings:

  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "brand" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "isNew" BOOLEAN NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT,
    "stockQuantity" INTEGER,
    "rating" REAL,
    "manufacturer" TEXT,
    "categoryId" TEXT NOT NULL,
    "subcategoryId" TEXT NOT NULL,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("brand", "categoryId", "color", "id", "isNew", "name", "price", "subcategoryId", "weight") SELECT "brand", "categoryId", "color", "id", "isNew", "name", "price", "subcategoryId", "weight" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
