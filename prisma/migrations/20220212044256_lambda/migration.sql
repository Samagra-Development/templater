-- CreateEnum
CREATE TYPE "TransformerType" AS ENUM ('OPTIONS', 'FUNCTION_EXTERNAL', 'FUNCTION_INTERNAL');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('JAVASCRIPT', 'TYPESCRIPT');

-- CreateEnum
CREATE TYPE "FunctionExecutionEvent" AS ENUM ('ADDED', 'DELETED', 'MODIFIED', 'RUN');

-- CreateTable
CREATE TABLE "Transformer" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" BIGSERIAL NOT NULL,
    "type" "TransformerType" NOT NULL,
    "meta" JSONB,
    "sampleData" JSONB,
    "functionDID" TEXT NOT NULL,

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

-- AddForeignKey
ALTER TABLE "ExecutionAudit" ADD CONSTRAINT "ExecutionAudit_transformerId_fkey" FOREIGN KEY ("transformerId") REFERENCES "Transformer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExecutionAudit" ADD CONSTRAINT "ExecutionAudit_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
