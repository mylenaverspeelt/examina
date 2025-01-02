/*
  Warnings:

  - Added the required column `fileName` to the `Storage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uuidName` to the `Storage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Storage" ADD COLUMN     "fileName" VARCHAR(255) NOT NULL,
ADD COLUMN     "uuidName" VARCHAR(255) NOT NULL;
