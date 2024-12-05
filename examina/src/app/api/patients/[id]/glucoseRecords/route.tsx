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
