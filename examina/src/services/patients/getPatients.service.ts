/**
 * @swagger
 * components:
 *   responses:
 *     PatientSearchSuccessResponse:
 *       description: Lista de pacientes encontrados
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientSearchResponseDTO'
 *     PatientSearchErrorResponse:
 *       description: Erro ao buscar pacientes
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: "Erro ao buscar pacientes"
 */
import prisma from '@/utils/prisma/prisma';
import { PatientSearchResponseDTO } from '@/dto/patients/patient.dto';

export class PatientService {
  static async searchPatients(query: string): Promise<PatientSearchResponseDTO> {
    const patients = await prisma.patient.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    return { patients };
  }
}
