/**
 * @swagger
 * components:
 *   schemas:
 *     PatientDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do paciente
 *           example: 1
 *         name:
 *           type: string
 *           description: Nome do paciente
 *           example: "João da Silva"
 *     PatientSearchResponseDTO:
 *       type: object
 *       properties:
 *         patients:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PatientDTO'
 */
export interface PatientDTO {
    id: number;
    name: string;
  }
  
  export interface PatientSearchResponseDTO {
    patients: PatientDTO[];
  }
  