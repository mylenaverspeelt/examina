-- CreateTable
CREATE TABLE "Storage" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "pdf" BYTEA NOT NULL,

    CONSTRAINT "Storage_pkey" PRIMARY KEY ("id")
);
