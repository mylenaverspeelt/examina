import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/pdfs:
 *   get:
 *     summary: Busca todos os PDFs
 *     description: Retorna uma lista de PDFs armazenados no banco de dados em formato base64.
 *     responses:
 *       200:
 *         description: Lista de PDFs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do PDF
 *                     example: 1
 *                   fileName:
 *                     type: string
 *                     description: Nome do arquivo PDF
 *                     example: "documento.pdf"
 *                   base64Pdf:
 *                     type: string
 *                     description: PDF em formato base64
 *                     example: "JVBERi0xLjcKCj... (conteúdo base64)"
 *       500:
 *         description: Erro ao buscar PDFs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Erro ao buscar PDFs: ..."
 */

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
