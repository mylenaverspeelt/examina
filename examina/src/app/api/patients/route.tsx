import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Busca pacientes por nome
 *     description: Retorna uma lista de pacientes cujo nome contém o termo de busca especificado.
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: O termo de busca para o nome do paciente.
 *     responses:
 *       200:
 *         description: Lista de pacientes correspondentes ao termo de busca.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 patients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID do paciente
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Nome do paciente
 *                         example: "João da Silva"
 *       400:
 *         description: Parâmetro de busca inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Parâmetro de busca inválido"
 *       500:
 *         description: Erro ao buscar pacientes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Erro ao buscar pacientes"
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Parâmetro de busca inválido' }, { status: 400 });
  }

  try {
    const patients = await prisma.patient.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json({ patients });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar pacientes' }, { status: 500 });
  }
}
