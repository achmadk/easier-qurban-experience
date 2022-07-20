/*
  Warnings:

  - You are about to drop the `MosqueUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id,name]` on the table `mosques` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `mosques_id_key` ON `mosques`;

-- DropTable
DROP TABLE `MosqueUser`;

-- CreateTable
CREATE TABLE `mosque_user` (
    `id` VARCHAR(191) NOT NULL,
    `mosque_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,
    `version` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `mosques_id_name_key` ON `mosques`(`id`, `name`);
