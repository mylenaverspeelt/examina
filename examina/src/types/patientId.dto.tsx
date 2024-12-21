/**
 * @swagger
 * components:
 *   schemas:
 *     PatientDetailsDTO:
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
 *         age:
 *           type: integer
 *           description: Idade do paciente
 *           example: 45
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Data de nascimento do paciente
 *           example: "1978-05-15"
 */
export interface PatientDetailsDTO {
    id: number;
    name: string;
    age: number;
    birthDate: string;
  }
  