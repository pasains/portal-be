/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET DATA TYPE VARCHAR(103),
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ADMIN';

-- CreateTable
CREATE TABLE "Post" (
    "id" BIGSERIAL NOT NULL,
    "slug" VARCHAR(50) NOT NULL,
    "author" VARCHAR(100) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "content" VARCHAR(250) NOT NULL,
    "picture" VARCHAR(100) NOT NULL,
    "paragraph" VARCHAR(2000) NOT NULL,
    "caption" VARCHAR(200) NOT NULL,
    "quote" VARCHAR(300) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
