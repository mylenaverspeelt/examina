/**
 * @swagger
 * /api/glucose/{id}:
 *   get:
 *     summary: Busca os registros de glicose de um paciente
 *     description: Retorna os registros de glicose do paciente com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente para buscar os registros de glicose.
 *     responses:
 *       200:
 *         description: Registros de glicose encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 records:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Data de criação do registro de glicose
 *                         example: "2024-12-05T14:30:00Z"
 *                       result:
 *                         type: number
 *                         description: Resultado da medição de glicose
 *                         example: 120
 *       400:
 *         description: ID do paciente é obrigatório
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "ID do paciente é obrigatório"
 *       404:
 *         description: Paciente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Paciente não encontrado"
 *       500:
 *         description: Erro ao buscar os registros de glicose
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Erro ao buscar registros de glicose"
 */


import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const glucoseRecords = await prisma.glucose.findMany({
      where: { patientId: parseInt(id, 10) },
      select: {
        createdAt: true,
        result: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ records: glucoseRecords });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar registros de glicose' }, { status: 500 });
  }
}
