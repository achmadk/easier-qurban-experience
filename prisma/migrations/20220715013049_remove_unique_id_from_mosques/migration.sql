/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `mosques` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `mosques_id_name_key` ON `mosques`;

-- CreateIndex
CREATE UNIQUE INDEX `mosques_name_key` ON `mosques`(`name`);
