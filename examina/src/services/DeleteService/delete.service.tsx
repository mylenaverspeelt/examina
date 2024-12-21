/**
 * @swagger
 * components:
 *   responses:
 *     DeleteSuccessResponse:
 *       description: PDF excluído com sucesso
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "PDF excluído com sucesso"
 *     DeleteErrorResponse:
 *       description: Erro ao excluir PDF
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Erro ao excluir PDF"
 */

import prisma from '@/utils/prisma';
import { DeleteDTO } from '@/types/delete.dto';

export class DeleteService {
  static async deletePDF(data: DeleteDTO): Promise<string> {
    const { id } = data;

    await prisma.storage.delete({
      where: { id },
    });

    return 'PDF excluído com sucesso';
  }
}
