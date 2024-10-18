import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const pdfs = await prisma.storage.findMany({
      select: {
        id: true,
        name: true,
        fileName: true,
        pdf: true,
      },
    });

    // Converter os PDFs de bytes para base64
    const pdfsWithBase64 = pdfs.map((pdf) => ({
      id: pdf.id,
      name: pdf.name,
      fileName: pdf.fileName,
      base64Pdf: Buffer.from(pdf.pdf).toString('base64'), // Conversão de bytes para base64
    }));

    return NextResponse.json(pdfsWithBase64);
  } catch (error) {
    console.error("Erro ao buscar PDFs:", error);
    return NextResponse.json({ error: "Erro ao buscar PDFs" }, { status: 500 });
  }
}
