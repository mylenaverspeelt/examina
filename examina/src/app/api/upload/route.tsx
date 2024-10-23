import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {

    if (!req.headers.get('content-type')?.includes('multipart/form-data')) {
      console.error('Formato inválido. Esperado multipart/form-data');
      return NextResponse.json({ error: 'Formato inválido. Esperado multipart/form-data' }, { status: 400 });
    }

    const formData = await req.formData();

    const uploadedFiles = formData.getAll('file');

    if (!uploadedFiles || uploadedFiles.length < 1) {
      console.error('Nenhum arquivo enviado');
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
    }

    const uploadedFile = uploadedFiles[0];

    if (!(uploadedFile instanceof File)) {
      console.error('Arquivo inválido. Não é do tipo File.');
      return NextResponse.json({ error: 'Formato de arquivo inválido' }, { status: 400 });
    }

    const fileName = uploadedFile.name;
    const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

    await prisma.storage.create({
      data: {
        fileName: fileName,
        pdf: fileBuffer,
      },
    });

    return NextResponse.json({
      message: 'PDF processado e salvo no banco de dados com sucesso!',
    });
  } catch (error) {
    console.error('Erro interno no servidor:', error);
    return NextResponse.json({ error: 'Erro interno do servidor', details: error }, { status: 500 });
  }
}
