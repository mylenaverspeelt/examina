import { NextRequest, NextResponse } from 'next/server';
import { UploadPdfService } from '@/services/pdfs/uploadPdf.service';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = async (req: NextRequest): Promise<{fields: any, files: any}> => {
  return new Promise((resolve, reject) => {
    const form = formidable({
      uploadDir: '/tmp',
      filename: (name, ext) => name.replace(/\s+/g, '_') + ext,
    });
    
    const readableStream = req.body as any;
    form.parse(readableStream, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

export async function POST(req: NextRequest) {
  try {
    if (!req.headers.get('content-type')?.includes('multipart/form-data')) {
      return NextResponse.json(
        { success: false, message: 'Formato inválido. Esperado multipart/form-data' },
        { status: 400 }
      );
    }

    const { files } = await parseForm(req);
    const uploadedFile = files.file?.[0];

    if (!uploadedFile) {
      return NextResponse.json(
        { success: false, message: 'Arquivo não enviado ou formato inválido' },
        { status: 400 }
      );
    }

    const response = await UploadPdfService.processPdf(uploadedFile.filepath);
    await fs.promises.unlink(uploadedFile.filepath);

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