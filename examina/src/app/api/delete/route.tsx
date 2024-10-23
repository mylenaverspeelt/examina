import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'ID é necessário' });
  }

  try {
    await prisma.storage.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: 'PDF excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir PDF:', error);
    return res.status(500).json({ message: 'Erro ao excluir PDF' });
  } finally {
    await prisma.$disconnect();
  }
}
