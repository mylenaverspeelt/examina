/**
 * @swagger
 * components:
 *   responses:
 *     GlucoseRecordsSuccess:
 *       description: Registros de glicose encontrados com sucesso
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GlucoseRecordsResponseDTO'
 *     GlucoseRecordsError:
 *       description: Erro ao buscar os registros de glicose
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: "Erro ao buscar registros de glicose"
 */
import prisma from '@/utils/prisma/prisma';
import { GlucoseRecordsResponseDTO, GlucoseRecordDTO } from '@/dto/glucose/patientIdGlucose.dto';

export class PatientIdGlucoseService {
  static async getGlucoseRecordsByPatientId(patientId: number): Promise<GlucoseRecordsResponseDTO> {
    const records = await prisma.glucose.findMany({
      where: { patientId },
      select: {
        createdAt: true,
        result: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    const formattedRecords: GlucoseRecordDTO[] = records.map(record => ({
      createdAt: record.createdAt.toISOString(), 
      result: record.result,
    }));

    return { records: formattedRecords };
  }
}
