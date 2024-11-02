import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
        // Inclua outros campos conforme necessário
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
