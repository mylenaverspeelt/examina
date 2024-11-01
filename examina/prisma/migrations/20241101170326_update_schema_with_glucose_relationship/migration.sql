/*
  Warnings:

  - You are about to drop the `MedicalReport` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "MedicalReport";

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "age" VARCHAR(10) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "birthDate" VARCHAR(20) NOT NULL,
    "resultId" INTEGER,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Glucose" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "pdfId" INTEGER NOT NULL,
    "result" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Glucose_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Glucose_patientId_idx" ON "Glucose"("patientId");

-- CreateIndex
CREATE INDEX "Glucose_pdfId_idx" ON "Glucose"("pdfId");

-- AddForeignKey
ALTER TABLE "Glucose" ADD CONSTRAINT "Glucose_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Glucose" ADD CONSTRAINT "Glucose_pdfId_fkey" FOREIGN KEY ("pdfId") REFERENCES "Storage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
