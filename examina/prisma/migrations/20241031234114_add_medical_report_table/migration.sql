-- CreateTable
CREATE TABLE "MedicalReport" (
    "id" SERIAL NOT NULL,
    "nomePaciente" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "exame" TEXT NOT NULL,
    "tipoDeAmostra" TEXT NOT NULL,
    "adequabilidadeDaAmostra" TEXT NOT NULL,
    "epiteliosRepresentados" TEXT NOT NULL,
    "microbiologia" TEXT NOT NULL,
    "alteracoesCelularesBenigna" TEXT NOT NULL,
    "conclusao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicalReport_pkey" PRIMARY KEY ("id")
);
