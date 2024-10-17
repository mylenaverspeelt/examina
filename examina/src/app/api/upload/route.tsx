import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import PDFParser from 'pdf2json';
import path from 'path';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    //recebe o form 
    const formData = await req.formData();
    const uploadedFiles = formData.getAll('filepond');

    if (!uploadedFiles || uploadedFiles.length < 1) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
    }

    const uploadedFile = uploadedFiles[1];

    if (!(uploadedFile instanceof File)) {
      return NextResponse.json({ error: 'Formato de arquivo inválido' }, { status: 400 });
    }

    // diretorio temporario pra armaenar o pdf
    const tempDir = path.join('C:', 'tmp');
    await fs.mkdir(tempDir, { recursive: true });

    //muda o nome do pdf pra um uui
    const fileName = `${uuidv4()}.pdf`;
    const tempFilePath = path.join(tempDir, fileName);

    //converte o pdf em buffer
    const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
    await fs.writeFile(tempFilePath, fileBuffer);

    //armazena o texto extraido no pdf com o pdf2json 
    const pdfParser = new (PDFParser as unknown as { new(): PDFParser })();
    let parsedText = '';

    await new Promise<void>((resolve, reject) => {
      pdfParser.on('pdfParser_dataError', (errData: { parserError: Error }) => {
        console.error(errData.parserError.message);
        reject(new Error('Erro ao parsear o PDF'));
      });

      pdfParser.on('pdfParser_dataReady', () => {
        if (typeof pdfParser.getRawTextContent === 'function') {
          parsedText = pdfParser.getRawTextContent();
        } else {
          console.error('Erro: Função getRawTextContent não encontrada');
        }
        resolve();
      });

      pdfParser.loadPDF(tempFilePath);
    });

    // salva de fato no bd
    await prisma.storage.create({
      data: {
        name: fileName,
        pdf: fileBuffer,
      },
    });

    return NextResponse.json({
      message: 'PDF processado e salvo no banco de dados com sucesso!',
      parsedText,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno do servidor', details: error }, { status: 500 });
  }
}
