/**
 * @swagger
 * /api/delete:
 *   delete:
 *     summary: Deleta um PDF pelo ID
 *     description: Essa rota deleta um registro PDF da base de dados com base no ID fornecido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do PDF que será deletado
 *                 example: 1
 *     responses:
 *       200:
 *         description: PDF excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "PDF excluído com sucesso"
 *       400:
 *         description: ID não fornecido ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ID é necessário"
 *       500:
 *         description: Erro ao excluir o PDF
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao excluir PDF"
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: 'ID é necessário' }, { status: 400 });
    }

    await prisma.storage.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'PDF excluído com sucesso' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao excluir PDF' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
