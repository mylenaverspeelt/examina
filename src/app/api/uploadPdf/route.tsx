import { NextRequest, NextResponse } from 'next/server';
import { UploadPdfService } from '@/services/pdfs/uploadPdf.service';
import Busboy from 'busboy';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function convertWebStreamToBuffer(webStream: ReadableStream): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  const reader = webStream.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  try {
    if (!req.headers.get('content-type')?.includes('multipart/form-data')) {
      return NextResponse.json(
        { success: false, message: 'Formato inválido. Esperado multipart/form-data' },
        { status: 400 }
      );
    }

    return new Promise(async (resolve, reject) => {
      const headers = {
        'content-type': req.headers.get('content-type') || '',
        'content-length': req.headers.get('content-length') || '',
      };

      const busboy = Busboy({ headers });
      let fileBuffer: Buffer[] = [];
      let fileName = '';

      busboy.on('file', (_, file, info) => {
        fileName = info.filename;
        file.on('data', (data) => {
          fileBuffer.push(data);
        });
      });

      busboy.on('finish', async () => {
        try {
          const buffer = Buffer.concat(fileBuffer);
          const response = await UploadPdfService.processPdf(buffer, fileName);
          resolve(NextResponse.json(response, { status: 200 }));
        } catch (error: any) {
          reject(error);
        }
      });

      busboy.on('error', (error) => {
        reject(error);
      });

      if (req.body) {
        // Converter o Web Stream para Buffer
        const buffer = await convertWebStreamToBuffer(req.body);
        // Criar um Node.js Readable Stream a partir do Buffer
        const nodeStream = Readable.from(buffer);
        // Agora podemos usar pipe
        nodeStream.pipe(busboy);
      } else {
        reject(new Error('Request body is empty'));
      }
    });

  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Erro interno do servidor',
        details: error.message,
      },
      { status: 500 }
    );
  }
}