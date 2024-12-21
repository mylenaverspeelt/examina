/**
 * @swagger
 * components:
 *   schemas:
 *     DeleteDTO:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do PDF que será deletado
 *           example: 1
 */

export interface DeleteDTO {
    id: number;
  }
  