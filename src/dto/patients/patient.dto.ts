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
 *           description: Lista de pacientes retornados na busca
 *     PatientDetailsDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do paciente
 *           example: 1
 *         name:
 *           type: string
 *           description: Nome completo do paciente
 *           example: "João da Silva"
 *         age:
 *           type: integer
 *           description: Idade do paciente
 *           example: 30
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Data de nascimento do paciente
 *           example: "1993-05-14"
 */

export interface PatientDTO {
    id: number;
    name: string;
  }
  
  export interface PatientSearchResponseDTO {
    patients: PatientDTO[];
  }
  
  export interface PatientDetailsDTO {
    id: number;
    name: string;
    age: number;
    birthDate: string;
  }
  