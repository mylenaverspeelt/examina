/*
  Warnings:

  - You are about to drop the column `name` on the `Storage` table. All the data in the column will be lost.
  - You are about to drop the column `uuidName` on the `Storage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Storage" DROP COLUMN "name",
DROP COLUMN "uuidName";
