import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false, // Desativamos o bodyParser padrão
  },
};

export async function POST(req: NextRequest) {
  try {
    // Verifique se o conteúdo do request é FormData
    if (!req.headers.get('content-type')?.includes('multipart/form-data')) {
      console.error('Formato inválido. Esperado multipart/form-data');
      return NextResponse.json({ error: 'Formato inválido. Esperado multipart/form-data' }, { status: 400 });
    }

    // Receber e logar o formData
    const formData = await req.formData();
    console.log('FormData recebido:', formData);

    const uploadedFiles = formData.getAll('file'); // 'file' deve ser o nome do campo no frontend

    if (!uploadedFiles || uploadedFiles.length < 1) {
      console.error('Nenhum arquivo enviado');
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
    }

    const uploadedFile = uploadedFiles[0];
    console.log('Arquivo recebido:', uploadedFile);

    // Verifica se o arquivo é de fato um PDF
    if (!(uploadedFile instanceof File)) {
      console.error('Arquivo inválido. Não é do tipo File.');
      return NextResponse.json({ error: 'Formato de arquivo inválido' }, { status: 400 });
    }

    // Diretorio temporário para armazenar o PDF
    const tempDir = path.join('C:', 'tmp');
    await fs.mkdir(tempDir, { recursive: true });

    // Muda o nome do PDF para um UUID
    const fileName = `${uuidv4()}.pdf`;
    const tempFilePath = path.join(tempDir, fileName);

    // Converte o PDF em buffer e salva temporariamente no disco
    const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
    await fs.writeFile(tempFilePath, fileBuffer);
    console.log('Arquivo salvo temporariamente em:', tempFilePath);

    // Armazena o texto extraído no PDF com o pdf2json
    // const pdfParser = new PDFParser();
    // let parsedText = '';

    // await new Promise<void>((resolve, reject) => {
    //   pdfParser.on('pdfParser_dataError', (errData: { parserError: Error }) => {
    //     console.error(errData.parserError.message);
    //     reject(new Error('Erro ao parsear o PDF'));
    //   });

    //   pdfParser.on('pdfParser_dataReady', () => {
    //     parsedText = pdfParser.getRawTextContent();
    //     resolve();
    //   });

    //   pdfParser.loadPDF(tempFilePath);
    // });

    // Salva no banco de dados com Prisma
    await prisma.storage.create({
      data: {
        name: fileName,      // Nome do arquivo
        uuidName: uuidv4(),  // UUID gerado para o arquivo
        fileName: fileName,  // Nome original do arquivo, que é obrigatório
        pdf: fileBuffer,     // PDF armazenado como bytes
      },
    });

    console.log('PDF processado e salvo no banco de dados com sucesso!');
    return NextResponse.json({
      message: 'PDF processado e salvo no banco de dados com sucesso!',
    });
  } catch (error) {
    console.error('Erro interno no servidor:', error);
    return NextResponse.json({ error: 'Erro interno do servidor', details: error }, { status: 500 });
  }
}
