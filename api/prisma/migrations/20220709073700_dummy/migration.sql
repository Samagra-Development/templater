-- AlterTable
ALTER TABLE "Template" ALTER COLUMN "body" DROP NOT NULL;

-- CreateTable
CREATE TABLE "BodyI18n" (
    "id" BIGSERIAL NOT NULL,
    "lang" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "templateId" BIGINT NOT NULL,

    CONSTRAINT "BodyI18n_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BodyI18n_lang_unique_constraint" ON "BodyI18n"("lang");

-- AddForeignKey
ALTER TABLE "BodyI18n" ADD CONSTRAINT "BodyI18n_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
