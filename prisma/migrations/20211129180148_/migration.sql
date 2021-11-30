-- CreateEnum
CREATE TYPE "TemplateType" AS ENUM ('JINJA', 'JS_TEMPLATE_LITERALS');

-- CreateEnum
CREATE TYPE "Event" AS ENUM ('RENDERED');

-- CreateTable
CREATE TABLE "Template" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" BIGSERIAL NOT NULL,
    "type" "TemplateType" NOT NULL,
    "useCase" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "meta" JSONB NOT NULL,
    "user" UUID NOT NULL,
    "tag" TEXT[],

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Audit" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" BIGSERIAL NOT NULL,
    "templateId" BIGINT NOT NULL,
    "event" "Event" NOT NULL,
    "renderedText" TEXT NOT NULL,

    CONSTRAINT "Audit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Audit" ADD CONSTRAINT "Audit_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
