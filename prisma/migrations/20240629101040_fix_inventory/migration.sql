/*
  Warnings:

  - You are about to drop the `_Inventory_group_member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Inventory_group_member" DROP CONSTRAINT "_Inventory_group_member_A_fkey";

-- DropForeignKey
ALTER TABLE "_Inventory_group_member" DROP CONSTRAINT "_Inventory_group_member_B_fkey";

-- DropTable
DROP TABLE "_Inventory_group_member";

-- CreateTable
CREATE TABLE "_inventory_group_member" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_inventory_group_member_AB_unique" ON "_inventory_group_member"("A", "B");

-- CreateIndex
CREATE INDEX "_inventory_group_member_B_index" ON "_inventory_group_member"("B");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_inventory_type_id_fkey" FOREIGN KEY ("inventory_type_id") REFERENCES "Inventory_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory_group" ADD CONSTRAINT "Inventory_group_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory_group" ADD CONSTRAINT "Inventory_group_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_inventory_group_member" ADD CONSTRAINT "_inventory_group_member_A_fkey" FOREIGN KEY ("A") REFERENCES "Inventory_group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_inventory_group_member" ADD CONSTRAINT "_inventory_group_member_B_fkey" FOREIGN KEY ("B") REFERENCES "Inventory_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
