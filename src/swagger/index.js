/**
 * @swagger
 * /api/food/get-food:
 *  get:
 *      description: responses
 *      tags: [Food]
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/v1/user/liked/{userId}:
 *  get:
 *      description: get list of liked restaurant based on user
 *      tags: [Liked Restaurant]
 *      parameters:
 *      - in: path
 *        name: id
 *      - in: body
 *        name: user
 *        schema:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *      responses:
 *          200:
 *              description: get list of restaurant user liked successfully
 */
