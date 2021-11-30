-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Event" ADD VALUE 'ADDED';
ALTER TYPE "Event" ADD VALUE 'DELETED';
ALTER TYPE "Event" ADD VALUE 'MODIFIED';

-- AlterTable
ALTER TABLE "Audit" ADD COLUMN     "meta" JSONB;
