/**
 * @swagger
 * components:
 *   schemas:
 *     GlucoseDTO:
 *       type: object
 *       properties:
 *         normalCount:
 *           type: integer
 *           description: Contagem de glicose normal
 *         preDiabetesCount:
 *           type: integer
 *           description: Contagem de glicose pré-diabetes
 *         diabetesCount:
 *           type: integer
 *           description: Contagem de glicose diabetes
 *     GlucoseRecordDTO:
 *       type: object
 *       properties:
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do registro de glicose
 *           example: "2024-12-05T14:30:00Z"
 *         result:
 *           type: number
 *           description: Resultado da medição de glicose
 *           example: 120
 *     GlucoseRecordsResponseDTO:
 *       type: object
 *       properties:
 *         records:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/GlucoseRecordDTO'
 */

export interface GlucoseDTO {
  normalCount: number;
  preDiabetesCount: number;
  diabetesCount: number;
}

export interface GlucoseRecordDTO {
  createdAt: string;
  result: number;
}

export interface GlucoseRecordsResponseDTO {
  records: GlucoseRecordDTO[];
}
