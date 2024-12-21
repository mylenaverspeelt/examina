/**
 * @swagger
 * /api/pdfs:
 *   get:
 *     summary: Busca todos os PDFs
 *     description: Retorna uma lista de PDFs armazenados no banco de dados em formato base64, ordenados pela data de envio.
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
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Data de envio do PDF
 *                     example: "2024-11-25T10:00:00Z"
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
import { NextResponse, NextRequest } from 'next/server';
import prisma from '../../../utils/prisma';

export async function GET(req: NextRequest) {
  try {
    const pdfs = await prisma.storage.findMany({
      select: {
        id: true,
        fileName: true,
        pdf: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const pdfsWithBase64 = pdfs.map((pdf) => ({
      id: pdf.id,
      fileName: pdf.fileName,
      base64Pdf: Buffer.from(pdf.pdf).toString('base64'),
      createdAt: pdf.createdAt,
    }));

    return NextResponse.json(pdfsWithBase64);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar PDFs" }, { status: 500 });
  }
}