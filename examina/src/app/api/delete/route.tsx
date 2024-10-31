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
    console.error('Erro ao excluir PDF:', error);
    return NextResponse.json({ message: 'Erro ao excluir PDF' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
