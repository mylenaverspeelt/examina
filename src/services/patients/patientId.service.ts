/**
 * @swagger
 * components:
 *   responses:
 *     PatientDetailsSuccess:
 *       description: Dados do paciente retornados com sucesso
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientDetailsDTO'
 *     PatientDetailsError:
 *       description: Erro ao buscar paciente
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: "Erro ao buscar paciente"
 */
import prisma from '@/utils/prisma/prisma';
import { PatientDetailsDTO } from '@/dto/patients/patientId.dto';

export class PatientIdService {
  static async getPatientById(id: number): Promise<PatientDetailsDTO | null> {
    const patient = await prisma.patient.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        age: true,
        birthDate: true,
      },
    });

    return patient
      ? {
          ...patient,
          age: Number(patient.age),
        }
      : null;
  }
}