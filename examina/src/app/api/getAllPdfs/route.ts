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
 *               $ref: '#/components/schemas/GetAllPdfsDTO'
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

import { NextResponse } from 'next/server';
import { PdfService } from '@/services/pdfs/getAllPdfs.service';

export async function GET() {
  try {
    const pdfs = await PdfService.getAllPdfs();
    return NextResponse.json(pdfs);
  } catch (e) {
    return NextResponse.json({ error: `Erro ao buscar PDFs: ${e.message}` }, { status: 500 });
  }
}
