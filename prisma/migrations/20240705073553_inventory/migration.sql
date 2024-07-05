-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "userName" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phoneNumber" CHAR(14) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "profile" VARCHAR(100) NOT NULL,
    "position" VARCHAR(100) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHistory" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" BIGINT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT NOT NULL,
    "oldData" JSONB NOT NULL,
    "newData" JSONB NOT NULL,

    CONSTRAINT "UserHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" BIGSERIAL NOT NULL,
    "inventoryName" VARCHAR(100) NOT NULL,
    "refId" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "isBorrowable" BOOLEAN NOT NULL DEFAULT true,
    "inventoryTypeId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" BIGINT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryType" (
    "id" BIGSERIAL NOT NULL,
    "inventoryTypeName" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "InventoryType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryGroup" (
    "id" BIGSERIAL NOT NULL,
    "inventoryGroupName" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "createdBy" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryStock" (
    "id" BIGSERIAL NOT NULL,
    "inventoryId" BIGINT NOT NULL,
    "quantity" SERIAL NOT NULL,
    "createdBy" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryHistory" (
    "id" BIGSERIAL NOT NULL,
    "inventoryId" BIGINT NOT NULL,
    "condition" VARCHAR(100) NOT NULL,
    "image" VARCHAR(100) NOT NULL,
    "createdBy" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" BIGSERIAL NOT NULL,
    "url" VARCHAR(200) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockLedger" (
    "id" BIGSERIAL NOT NULL,
    "inventoryId" BIGINT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "quantityAfterTransaction" INTEGER NOT NULL,
    "voucherType" VARCHAR(100) NOT NULL,
    "voucherName" BIGINT NOT NULL,
    "createdBy" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockLedger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" BIGSERIAL NOT NULL,
    "receivingId" BIGINT NOT NULL,
    "inventoryId" BIGINT NOT NULL,
    "quantity" BIGINT NOT NULL,
    "condition" VARCHAR(100) NOT NULL,
    "createdBy" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receiving" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "notes" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdBy" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Receiving_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReceivingStatus" (
    "id" BIGSERIAL NOT NULL,
    "receivingId" BIGINT NOT NULL,
    "status" VARCHAR(100) NOT NULL,
    "createdBy" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReceivingStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Borrowing" (
    "id" BIGSERIAL NOT NULL,
    "borrowerId" BIGINT NOT NULL,
    "borrowingStatus" BIGINT NOT NULL,
    "organizationId" BIGINT NOT NULL,
    "dueDate" DATE NOT NULL,
    "specialInstruction" TEXT NOT NULL,
    "createdBy" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Borrowing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowingStatus" (
    "id" BIGSERIAL NOT NULL,
    "itemId" BIGINT NOT NULL,
    "inventoryId" BIGINT NOT NULL,
    "status" VARCHAR(100) NOT NULL,
    "createdBy" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BorrowingStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Borrower" (
    "id" BIGSERIAL NOT NULL,
    "borrowerName" VARCHAR(100) NOT NULL,
    "organizationName" TEXT NOT NULL,
    "identityCard" CHAR(10) NOT NULL,
    "identityNumber" VARCHAR(50) NOT NULL,
    "phoneNumber" CHAR(14) NOT NULL,
    "createdBy" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Borrower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" BIGSERIAL NOT NULL,
    "organizationName" VARCHAR(100) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "organizationStatus" VARCHAR(100) NOT NULL,
    "note" TEXT NOT NULL,
    "createdBy" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_inventoryGroupMember" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_organizationName_key" ON "Organization"("organizationName");

-- CreateIndex
CREATE UNIQUE INDEX "_inventoryGroupMember_AB_unique" ON "_inventoryGroupMember"("A", "B");

-- CreateIndex
CREATE INDEX "_inventoryGroupMember_B_index" ON "_inventoryGroupMember"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_inventoryTypeId_fkey" FOREIGN KEY ("inventoryTypeId") REFERENCES "InventoryType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryGroup" ADD CONSTRAINT "InventoryGroup_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryGroup" ADD CONSTRAINT "InventoryGroup_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryStock" ADD CONSTRAINT "InventoryStock_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryStock" ADD CONSTRAINT "InventoryStock_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryStock" ADD CONSTRAINT "InventoryStock_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryHistory" ADD CONSTRAINT "InventoryHistory_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryHistory" ADD CONSTRAINT "InventoryHistory_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryHistory" ADD CONSTRAINT "InventoryHistory_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_id_fkey" FOREIGN KEY ("id") REFERENCES "InventoryHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLedger" ADD CONSTRAINT "StockLedger_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLedger" ADD CONSTRAINT "StockLedger_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockLedger" ADD CONSTRAINT "StockLedger_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_receivingId_fkey" FOREIGN KEY ("receivingId") REFERENCES "Receiving"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receiving" ADD CONSTRAINT "Receiving_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receiving" ADD CONSTRAINT "Receiving_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receiving" ADD CONSTRAINT "Receiving_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceivingStatus" ADD CONSTRAINT "ReceivingStatus_receivingId_fkey" FOREIGN KEY ("receivingId") REFERENCES "Receiving"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceivingStatus" ADD CONSTRAINT "ReceivingStatus_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_borrowingStatus_fkey" FOREIGN KEY ("borrowingStatus") REFERENCES "BorrowingStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowingStatus" ADD CONSTRAINT "BorrowingStatus_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowingStatus" ADD CONSTRAINT "BorrowingStatus_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowingStatus" ADD CONSTRAINT "BorrowingStatus_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowingStatus" ADD CONSTRAINT "BorrowingStatus_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrower" ADD CONSTRAINT "Borrower_organizationName_fkey" FOREIGN KEY ("organizationName") REFERENCES "Organization"("organizationName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrower" ADD CONSTRAINT "Borrower_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrower" ADD CONSTRAINT "Borrower_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_inventoryGroupMember" ADD CONSTRAINT "_inventoryGroupMember_A_fkey" FOREIGN KEY ("A") REFERENCES "InventoryGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_inventoryGroupMember" ADD CONSTRAINT "_inventoryGroupMember_B_fkey" FOREIGN KEY ("B") REFERENCES "InventoryType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
