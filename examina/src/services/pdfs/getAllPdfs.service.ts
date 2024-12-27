/**
 * @swagger
 * components:
 *   responses:
 *     GetAllPdfsSuccessResponse:
 *       description: Lista de PDFs retornada com sucesso
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/GetAllPdfsDTO'
 *     GetAllPdfsErrorResponse:
 *       description: Erro ao buscar PDFs
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Erro ao buscar PDFs"
 */

import prisma from '@/utils/prisma/prisma';
import { GetAllPdfsDTO } from '@/dto/pdfs/getAllPdfs.dto';

export class PdfService {
  static async getAllPdfs(): Promise<GetAllPdfsDTO[]> {
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

    return pdfs.map((pdf) => ({
      id: pdf.id,
      fileName: pdf.fileName,
      base64Pdf: Buffer.from(pdf.pdf).toString('base64'),
      createdAt: pdf.createdAt,
    }));
  }
}
