import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import PDFParser from 'pdf2json';
import { convertToText } from '../../../../utils/convertToText';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    if (!req.headers.get('content-type')?.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Formato inválido. Esperado multipart/form-data' }, { status: 400 });
    }

    const formData = await req.formData();
    const uploadedFiles = formData.getAll('file');

    if (!uploadedFiles || uploadedFiles.length < 1) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
    }

    const uploadedFile = uploadedFiles[0];

    if (!(uploadedFile instanceof File)) {
      return NextResponse.json({ error: 'Formato de arquivo inválido' }, { status: 400 });
    }

    const fileName = uploadedFile.name;
    const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
    const pdfParser = new PDFParser();

    return new Promise((resolve, reject) => {
      pdfParser.on('pdfParser_dataError', (errMsg: { parserError: Error }) => {
        console.error('Erro ao processar o PDF:', errMsg.parserError.message);
        reject(new Error('Erro ao processar o PDF'));
      });

      pdfParser.on('pdfParser_dataReady', async (pdfData: { Pages: Array<{ Texts: Array<{ R: Array<{ T: string }> }> }> }) => {
        try {
          const extractedData = convertToText(pdfData);

          const storageEntry = await prisma.storage.create({
            data: {
              fileName: fileName,
              pdf: fileBuffer,
            },
          });

          let patient = await prisma.patient.findFirst({
            where: { name: extractedData.Paciente },
          });

          if (!patient) {
            patient = await prisma.patient.create({
              data: {
                name: extractedData.Paciente,
                age: extractedData.Idade,
                birthDate: extractedData.DataNascimento
              },
            });
          }

          await prisma.glucose.create({
            data: {
              patientId: patient.id,
              pdfId: storageEntry.id,
              result: parseInt(extractedData.Result, 10),
              createdAt: new Date(),
            },
          });

          resolve(
            NextResponse.json({
              message: 'PDF processado e salvo no banco de dados com sucesso!',
            }, { status: 200 })
          );
        } catch (error) {
          console.error('Erro no processamento dos dados:', error);
          reject(new Error('Erro ao salvar dados no banco de dados'));
        }
      });

      pdfParser.parseBuffer(fileBuffer);
    });
  } catch (error) {
    console.error('Erro no processamento:', error);
    return NextResponse.json({ error: 'Erro interno do servidor', details: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
