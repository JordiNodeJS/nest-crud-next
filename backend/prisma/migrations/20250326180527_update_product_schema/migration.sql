/*
  Warnings:

  - A unique constraint covering the columns `[name,price]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Product_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_price_key" ON "Product"("name", "price");
