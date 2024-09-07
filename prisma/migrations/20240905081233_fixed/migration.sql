/*
  Warnings:

  - You are about to drop the column `image` on the `InventoryHistory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_id_fkey";

-- AlterTable
ALTER TABLE "InventoryHistory" DROP COLUMN "image",
ADD COLUMN     "documentIdRel" BIGINT;

-- AddForeignKey
ALTER TABLE "InventoryHistory" ADD CONSTRAINT "InventoryHistory_documentIdRel_fkey" FOREIGN KEY ("documentIdRel") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;
