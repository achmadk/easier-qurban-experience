/*
  Warnings:

  - Added the required column `code` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `roles` ADD COLUMN `code` TEXT NOT NULL;
