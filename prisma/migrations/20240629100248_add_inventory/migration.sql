-- CreateTable
CREATE TABLE "Inventory" (
    "id" BIGSERIAL NOT NULL,
    "inventory_name" VARCHAR(100) NOT NULL,
    "ref_id" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "is_borrowable" BOOLEAN NOT NULL DEFAULT true,
    "inventory_type_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" BIGINT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory_type" (
    "id" BIGSERIAL NOT NULL,
    "inventory_type_name" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Inventory_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory_group" (
    "id" BIGSERIAL NOT NULL,
    "inventory_group_name" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" BIGINT NOT NULL,

    CONSTRAINT "Inventory_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Inventory_group_member" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Inventory_group_member_AB_unique" ON "_Inventory_group_member"("A", "B");

-- CreateIndex
CREATE INDEX "_Inventory_group_member_B_index" ON "_Inventory_group_member"("B");

-- AddForeignKey
ALTER TABLE "_Inventory_group_member" ADD CONSTRAINT "_Inventory_group_member_A_fkey" FOREIGN KEY ("A") REFERENCES "Inventory_group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Inventory_group_member" ADD CONSTRAINT "_Inventory_group_member_B_fkey" FOREIGN KEY ("B") REFERENCES "Inventory_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
