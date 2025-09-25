/*
  Warnings:

  - The values [Frontend,Backend,Fullstack] on the enum `ProjectType` will be removed. If these variants are still used in the database, this will fail.
  - The values [Basico,Intermediario,Avancado,Especialista] on the enum `SkillLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ProjectType_new" AS ENUM ('FRONTEND', 'BACKEND', 'FULLSTACK');
ALTER TABLE "public"."Project" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "public"."Project" ALTER COLUMN "type" TYPE "public"."ProjectType_new" USING ("type"::text::"public"."ProjectType_new");
ALTER TYPE "public"."ProjectType" RENAME TO "ProjectType_old";
ALTER TYPE "public"."ProjectType_new" RENAME TO "ProjectType";
DROP TYPE "public"."ProjectType_old";
ALTER TABLE "public"."Project" ALTER COLUMN "type" SET DEFAULT 'FULLSTACK';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."SkillLevel_new" AS ENUM ('BASICO', 'INTERMEDIARIO', 'AVANCADO', 'EXPERIENTE');
ALTER TABLE "public"."Skill" ALTER COLUMN "level" TYPE "public"."SkillLevel_new" USING ("level"::text::"public"."SkillLevel_new");
ALTER TYPE "public"."SkillLevel" RENAME TO "SkillLevel_old";
ALTER TYPE "public"."SkillLevel_new" RENAME TO "SkillLevel";
DROP TYPE "public"."SkillLevel_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."Project" ALTER COLUMN "type" SET DEFAULT 'FULLSTACK';
