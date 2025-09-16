/*
  Warnings:

  - You are about to drop the column `link` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "link",
ADD COLUMN     "linkDeploy" TEXT,
ADD COLUMN     "linkRepo" TEXT;
