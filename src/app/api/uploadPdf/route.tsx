import { NextRequest, NextResponse } from 'next/server';
import { UploadPdfService } from '@/services/pdfs/uploadPdf.service';
import fs from 'fs';

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
    const uploadedFile = formData.get('file');

    if (!uploadedFile || !(uploadedFile instanceof File)) {
      return NextResponse.json(
        { success: false, message: 'Arquivo não enviado ou formato inválido' },
        { status: 400 }
      );
    }

    const fileName = uploadedFile.name.replace(/\s+/g, '_');
    const tempFilePath = `/tmp/${fileName}`;
    const writableStream = fs.createWriteStream(tempFilePath);
    const reader = uploadedFile.stream().getReader();

    let done = false;
    while (!done) {
      const { value, done: streamDone } = await reader.read();
      done = streamDone;
      if (value) {
        writableStream.write(value);
      }
    }

    writableStream.end();
    await new Promise((resolve) => writableStream.on('finish', resolve));

    const response = await UploadPdfService.processPdf(tempFilePath);
    await fs.promises.unlink(tempFilePath);

    return NextResponse.json(response, { status: 200 });
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
