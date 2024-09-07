/*
  Warnings:

  - You are about to drop the column `documentIdRel` on the `InventoryHistory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `Document` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "InventoryHistory" DROP CONSTRAINT "InventoryHistory_documentIdRel_fkey";

-- AlterTable
ALTER TABLE "InventoryHistory" DROP COLUMN "documentIdRel",
ADD COLUMN     "image" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Document_url_key" ON "Document"("url");

-- AddForeignKey
ALTER TABLE "InventoryHistory" ADD CONSTRAINT "InventoryHistory_image_fkey" FOREIGN KEY ("image") REFERENCES "Document"("url") ON DELETE SET NULL ON UPDATE CASCADE;
