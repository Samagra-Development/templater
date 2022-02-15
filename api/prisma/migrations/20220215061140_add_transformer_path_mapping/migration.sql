-- CreateTable
CREATE TABLE "TransformerPathMapping" (
    "id" BIGSERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "transformer" "TransformerType" NOT NULL,
    "templateId" BIGINT,

    CONSTRAINT "TransformerPathMapping_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TransformerPathMapping" ADD CONSTRAINT "TransformerPathMapping_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;
