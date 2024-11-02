// src/app/api/getGlucose/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Query para buscar todos os resultados de glicose
    const glucoses = await prisma.glucose.findMany({
      select: {
        result: true,
      },
    });

    // Contar os resultados em cada categoria
    const normalCount = glucoses.filter((g) => g.result <= 99).length;
    const preDiabetesCount = glucoses.filter((g) => g.result >= 100 && g.result <= 125).length;
    const diabetesCount = glucoses.filter((g) => g.result >= 126).length;

    return NextResponse.json({
      normalCount,
      preDiabetesCount,
      diabetesCount,
    });
  } catch (error) {
    console.error('Erro ao buscar os resultados de glicose:', error);
    return NextResponse.json({ error: 'Erro ao buscar os resultados de glicose' }, { status: 500 });
  }
}
