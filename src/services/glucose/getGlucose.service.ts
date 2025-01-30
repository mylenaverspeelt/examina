/**
 * @swagger
 * /getGlucoseCounts:
 *   get:
 *     summary: Retorna os contadores de glicose
 *     description: Endpoint para obter a contagem de glicose normal, pré-diabetes e diabetes
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GlucoseDTO'
 *       500:
 *         description: Erro interno do servidor
 */

import prisma from "@/utils/prisma/prisma"
import { GlucoseDTO } from "@/dto/glucose/glucose.dto"

export class GlucoseService {
	static async getGlucoseCounts(): Promise<GlucoseDTO> {
		const glucoses = await prisma.glucose.findMany({
			select: {
				result: true,
			},
		})

		return {
			normalCount: glucoses.filter((g) => g.result <= 99).length,
			preDiabetesCount: glucoses.filter((g) => g.result >= 100 && g.result <= 125).length,
			diabetesCount: glucoses.filter((g) => g.result >= 126).length,
		}
	}
}