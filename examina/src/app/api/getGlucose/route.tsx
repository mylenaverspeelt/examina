import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
/**
 * @swagger
 * /api/getGlucose:
 *   get:
 *     summary: Busca e conta os resultados de glicose por categoria
 *     description: Retorna a contagem de resultados de glicose nas categorias Normal, Pré-diabetes e Diabetes.
 *     responses:
 *       200:
 *         description: Contagem de resultados de glicose por categoria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 normalCount:
 *                   type: integer
 *                   description: Número de resultados de glicose normais (<= 99 mg/dL)
 *                   example: 20
 *                 preDiabetesCount:
 *                   type: integer
 *                   description: Número de resultados de glicose em pré-diabetes (100-125 mg/dL)
 *                   example: 15
 *                 diabetesCount:
 *                   type: integer
 *                   description: Número de resultados de glicose na faixa de diabetes (>= 126 mg/dL)
 *                   example: 5
 *       500:
 *         description: Erro ao buscar os resultados de glicose
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Erro ao buscar os resultados de glicose"
 */



export async function GET() {
  try {
    const glucoses = await prisma.glucose.findMany({
      select: {
        result: true,
      },
    });

    const normalCount = glucoses.filter((g) => g.result <= 99).length;
    const preDiabetesCount = glucoses.filter((g) => g.result >= 100 && g.result <= 125).length;
    const diabetesCount = glucoses.filter((g) => g.result >= 126).length;

    return NextResponse.json({
      normalCount,
      preDiabetesCount,
      diabetesCount,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar os resultados de glicose' }, { status: 500 });
  }
}
