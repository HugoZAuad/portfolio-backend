/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `level` on the `Skill` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."SkillLevel" AS ENUM ('basico', 'intermediario', 'avancado', 'especialista');

-- AlterTable
ALTER TABLE "public"."Skill" DROP COLUMN "level",
ADD COLUMN     "level" "public"."SkillLevel" NOT NULL;

-- DropTable
DROP TABLE "public"."User";
