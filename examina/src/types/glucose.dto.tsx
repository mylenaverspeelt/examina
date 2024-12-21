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
 */


export interface GlucoseDTO {
    normalCount: number;
    preDiabetesCount: number;
    diabetesCount: number;
  }