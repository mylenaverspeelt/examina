/**
 * @swagger
 * /api/uploadPdf:
 *   post:
 *     summary: Upload e processamento de PDF
 *     description: Faz o upload de um arquivo PDF, extrai dados específicos e armazena informações no banco de dados.
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo PDF para upload e processamento.
 *     responses:
 *       200:
 *         description: PDF processado e salvo no banco de dados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Arquivo enviado e processado com sucesso!"
 *       400:
 *         description: Erro de validação (ex. formato inválido, arquivo não enviado).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Formato inválido. Esperado multipart/form-data"
 *       500:
 *         description: Erro interno do servidor ao processar o PDF.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Erro interno do servidor"
 *                 details:
 *                   type: string
 *                   description: Detalhes do erro
 */

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
      return NextResponse.json(
        { success: false, message: 'Formato inválido. Esperado multipart/form-data' },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const uploadedFiles = formData.getAll('file');

    if (!uploadedFiles || uploadedFiles.length < 1) {
      return NextResponse.json(
        { success: false, message: 'Nenhum arquivo enviado' },
        { status: 400 }
      );
    }

    const uploadedFile = uploadedFiles[0];

    if (!(uploadedFile instanceof File)) {
      return NextResponse.json(
        { success: false, message: 'Formato de arquivo inválido' },
        { status: 400 }
      );
    }

    const fileName = uploadedFile.name;
    const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
    const pdfParser = new PDFParser();

    return new Promise((resolve, reject) => {
      pdfParser.on('pdfParser_dataError', () => {
        console.error('Erro ao processar o PDF:');
        reject(new Error('Erro ao processar o PDF'));
      });

      pdfParser.on('pdfParser_dataReady', async (pdfData) => {
        try {
          const extractedData = convertToText(pdfData);

          if (!extractedData.Paciente || !extractedData.Result || isNaN(parseInt(extractedData.Result, 10))) {
            throw new Error('Dados extraídos inválidos ou incompletos');
          }

          const glucoseValue = parseInt(extractedData.Result, 10);

          if (isNaN(glucoseValue)) {
            throw new Error('Valor de glicose inválido');
          }

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
                birthDate: extractedData.DataNascimento,
              },
            });
          }

          await prisma.glucose.create({
            data: {
              patientId: patient.id,
              pdfId: storageEntry.id,
              result: glucoseValue,
              createdAt: new Date(),
            },
          });

          console.log('GLICOSE:', glucoseValue);
          resolve(
            NextResponse.json(
              {
                success: true,
                message: 'Arquivo enviado e processado com sucesso!',
              },
              { status: 200 }
            )
          );
        } catch (error) {
          if (error instanceof Error) {
            reject(
              NextResponse.json(
                {
                  success: false,
                  message: 'Erro ao salvar dados no banco de dados',
                  details: error.message,
                },
                { status: 500 }
              )
            );
          } else {
            reject(
              NextResponse.json(
                {
                  success: false,
                  message: 'Erro desconhecido ao processar os dados',
                },
                { status: 500 }
              )
            );
          }
        }
      });

      pdfParser.parseBuffer(fileBuffer);
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: 'Erro interno do servidor',
          details: error.message,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Erro interno do servidor. Erro desconhecido.',
        },
        { status: 500 }
      );
    }
  } finally {
    await prisma.$disconnect();
  }
}
