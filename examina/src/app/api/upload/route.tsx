import { NextRequest, NextResponse } from 'next/server';
import { UploadPdfService } from '@/services/UploadService/uploadPdf.service';

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

    const fileName = uploadedFile.name;
    const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

    const response = await UploadPdfService.processPdf(fileName, fileBuffer);
    return NextResponse.json(response, { status: 200 });
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
        { success: false, message: 'Erro desconhecido ao processar o PDF' },
        { status: 500 }
      );
    }
  }
}
