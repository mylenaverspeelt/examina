import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const pdfs = await prisma.storage.findMany({
      select: {
        id: true,
        fileName: true,
        pdf: true,
      },
    });

    const pdfsWithBase64 = pdfs.map((pdf) => ({
      id: pdf.id,
      fileName: pdf.fileName,
      base64Pdf: Buffer.from(pdf.pdf).toString('base64'),
    }));
    
    return NextResponse.json(pdfsWithBase64);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar PDFs: " + error }, { status: 500 });
  }
}
