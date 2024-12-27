/**
 * @swagger
 * components:
 *   schemas:
 *     PdfUploadResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Arquivo enviado e processado com sucesso!"
 *     PdfUploadErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Erro interno do servidor"
 *         details:
 *           type: string
 *           description: Detalhes do erro
 *           example: "Erro ao salvar dados no banco de dados"
 */
export interface PdfUploadResponse {
    success: boolean;
    message: string;
  }
  
  export interface PdfUploadErrorResponse {
    success: boolean;
    message: string;
    details?: string;
  }
  