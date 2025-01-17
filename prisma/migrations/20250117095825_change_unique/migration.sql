/*
  Warnings:

  - A unique constraint covering the columns `[inventoryGroupName]` on the table `InventoryGroup` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inventoryTypeName]` on the table `InventoryType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "InventoryGroup_inventoryGroupName_key" ON "InventoryGroup"("inventoryGroupName");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryType_inventoryTypeName_key" ON "InventoryType"("inventoryTypeName");
