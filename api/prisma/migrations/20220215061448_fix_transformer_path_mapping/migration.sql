/*
  Warnings:

  - You are about to drop the column `transformer` on the `TransformerPathMapping` table. All the data in the column will be lost.
  - Added the required column `transformerId` to the `TransformerPathMapping` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransformerPathMapping" DROP COLUMN "transformer",
ADD COLUMN     "transformerId" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "TransformerPathMapping" ADD CONSTRAINT "TransformerPathMapping_transformerId_fkey" FOREIGN KEY ("transformerId") REFERENCES "Transformer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
