import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Busca um paciente pelo ID
 *     description: Retorna os detalhes de um paciente específico com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente a ser buscado.
 *     responses:
 *       200:
 *         description: Dados do paciente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 patient:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID do paciente
 *                       example: 1
 *                     name:
 *                       type: string
 *                       description: Nome do paciente
 *                       example: "João da Silva"
 *                     age:
 *                       type: integer
 *                       description: Idade do paciente
 *                       example: 45
 *                     birthDate:
 *                       type: string
 *                       format: date
 *                       description: Data de nascimento do paciente
 *                       example: "1978-05-15"
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
 *         description: Erro ao buscar paciente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Erro ao buscar paciente"
 */

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'ID do paciente é obrigatório' }, { status: 400 });
  }

  try {
    const patient = await prisma.patient.findUnique({
      where: { id: parseInt(id, 10) },
      select: {
        id: true,
        name: true,
        age: true,
        birthDate: true,
      },
    });

    if (!patient) {
      return NextResponse.json({ error: 'Paciente não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ patient });
  } catch (error) {
    console.error("Erro ao buscar paciente:", error);
    return NextResponse.json({ error: 'Erro ao buscar paciente' }, { status: 500 });
  }
}
