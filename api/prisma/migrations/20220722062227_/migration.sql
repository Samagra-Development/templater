-- CreateEnum
CREATE TYPE "TemplateType" AS ENUM ('JINJA', 'JS_TEMPLATE_LITERALS', 'EJS');

-- CreateEnum
CREATE TYPE "TransformerType" AS ENUM ('OPTIONS', 'FUNCTION_EXTERNAL', 'FUNCTION_INTERNAL');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('JAVASCRIPT', 'TYPESCRIPT');

-- CreateEnum
CREATE TYPE "Event" AS ENUM ('ADDED', 'DELETED', 'MODIFIED', 'RENDERED');

-- CreateEnum
CREATE TYPE "FunctionExecutionEvent" AS ENUM ('ADDED', 'DELETED', 'MODIFIED', 'RUN');

-- CreateEnum
CREATE TYPE "LanguageCodes" AS ENUM ('aa', 'ab', 'af', 'ak', 'am', 'ar', 'an', 'as', 'av', 'ae', 'ay', 'az', 'ba', 'bm', 'be', 'bn', 'bi', 'bo', 'bs', 'br', 'bg', 'ca', 'cs', 'ch', 'ce', 'cu', 'cv', 'kw', 'co', 'cr', 'cy', 'da', 'de', 'dv', 'dz', 'el', 'en', 'eo', 'et', 'eu', 'ee', 'fo', 'fa', 'fj', 'fi', 'fr', 'fy', 'ff', 'gd', 'ga', 'gl', 'gv', 'gn', 'gu', 'ht', 'ha', 'sh', 'he', 'hz', 'hi', 'ho', 'hr', 'hu', 'hy', 'ig', 'io', 'ii', 'iu', 'ie', 'ia', 'id', 'ik', 'is', 'it', 'jv', 'ja', 'kl', 'kn', 'ks', 'ka', 'kr', 'kk', 'km', 'ki', 'rw', 'ky', 'kv', 'kg', 'ko', 'kj', 'ku', 'lo', 'la', 'lv', 'li', 'ln', 'lt', 'lb', 'lu', 'lg', 'mh', 'ml', 'mr', 'mk', 'mg', 'mt', 'mn', 'mi', 'ms', 'my', 'na', 'nv', 'nr', 'nd', 'ng', 'ne', 'nl', 'nn', 'nb', 'no', 'ny', 'oc', 'oj', 'or', 'om', 'os', 'pa', 'pi', 'pl', 'pt', 'ps', 'qu', 'rm', 'ro', 'rn', 'ru', 'sg', 'sa', 'si', 'sk', 'sl', 'se', 'sm', 'sn', 'sd', 'so', 'st', 'es', 'sq', 'sc', 'sr', 'ss', 'su', 'sw', 'sv', 'ty', 'ta', 'tt', 'te', 'tg', 'tl', 'th', 'ti', 'to', 'tn', 'ts', 'tk', 'tr', 'tw', 'ug', 'uk', 'ur', 'uz', 've', 'vi', 'vo', 'wa', 'wo', 'xh', 'yi', 'yo', 'za', 'zh', 'zu');

-- CreateTable
CREATE TABLE "TransformerPathMapping" (
    "id" BIGSERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "templateId" BIGINT,
    "transformerId" BIGINT NOT NULL,

    CONSTRAINT "TransformerPathMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" BIGSERIAL NOT NULL,
    "type" "TemplateType" NOT NULL,
    "useCase" TEXT,
    "body" TEXT,
    "meta" JSONB,
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
    "meta" JSONB,

    CONSTRAINT "Audit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transformer" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" BIGSERIAL NOT NULL,
    "type" "TransformerType" NOT NULL,
    "meta" JSONB,
    "sampleData" JSONB,
    "functionDID" TEXT,

    CONSTRAINT "Transformer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalLambda" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" BIGSERIAL NOT NULL,
    "uri" TEXT NOT NULL,
    "meta" JSONB,
    "sampleData" JSONB,

    CONSTRAINT "ExternalLambda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lambda" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" BIGSERIAL NOT NULL,
    "tags" TEXT[],
    "name" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "user" UUID NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "language" "Language" NOT NULL,

    CONSTRAINT "Lambda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExecutionAudit" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" BIGSERIAL NOT NULL,
    "event" "FunctionExecutionEvent" NOT NULL,
    "meta" JSONB,
    "transformerId" BIGINT NOT NULL,
    "templateId" BIGINT NOT NULL,

    CONSTRAINT "ExecutionAudit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BodyI18n" (
    "id" BIGSERIAL NOT NULL,
    "lang" "LanguageCodes" NOT NULL,
    "body" TEXT NOT NULL,
    "templateId" BIGINT NOT NULL,

    CONSTRAINT "BodyI18n_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TransformerPathMapping" ADD CONSTRAINT "TransformerPathMapping_transformerId_fkey" FOREIGN KEY ("transformerId") REFERENCES "Transformer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransformerPathMapping" ADD CONSTRAINT "TransformerPathMapping_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Audit" ADD CONSTRAINT "Audit_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExecutionAudit" ADD CONSTRAINT "ExecutionAudit_transformerId_fkey" FOREIGN KEY ("transformerId") REFERENCES "Transformer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExecutionAudit" ADD CONSTRAINT "ExecutionAudit_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BodyI18n" ADD CONSTRAINT "BodyI18n_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
