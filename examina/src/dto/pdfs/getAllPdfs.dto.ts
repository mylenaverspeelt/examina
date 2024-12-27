/**
 * @swagger
 * components:
 *   schemas:
 *     GetAllPdfsDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do PDF
 *           example: 1
 *         fileName:
 *           type: string
 *           description: Nome do arquivo PDF
 *           example: "documento.pdf"
 *         base64Pdf:
 *           type: string
 *           description: PDF em formato base64
 *           example: "JVBERi0xLjcKCj... (conteúdo base64)"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de envio do PDF
 *           example: "2024-11-25T10:00:00Z"
 */

export interface GetAllPdfsDTO {
    id: number;
    fileName: string;
    base64Pdf: string;
    createdAt: Date;
  }
  