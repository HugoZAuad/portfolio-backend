/*
  Warnings:

  - The values [basico,intermediario,avancado,especialista] on the enum `SkillLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."ProjectType" AS ENUM ('Frontend', 'Backend', 'Fullstack');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."SkillLevel_new" AS ENUM ('Basico', 'Intermediario', 'Avancado', 'Especialista');
ALTER TABLE "public"."Skill" ALTER COLUMN "level" TYPE "public"."SkillLevel_new" USING ("level"::text::"public"."SkillLevel_new");
ALTER TYPE "public"."SkillLevel" RENAME TO "SkillLevel_old";
ALTER TYPE "public"."SkillLevel_new" RENAME TO "SkillLevel";
DROP TYPE "public"."SkillLevel_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "type" "public"."ProjectType" NOT NULL DEFAULT 'Fullstack';
