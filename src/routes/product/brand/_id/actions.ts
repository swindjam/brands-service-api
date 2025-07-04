import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import { Type } from '@fastify/type-provider-typebox'

// Get all store entities for a product by product-id
export default async (fastify: FastifyInstance) => (
    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            response: {
                200: Type.Object({
                    products: Type.Array(
                        Type.Object({
                            id: Type.String()
                        })
                    )
                }),
                403: Type.Boolean(),
                500: Type.Number(),
            }
        },
        handler: async (request: FastifyRequest<{ Params: {  id: string } }>, reply: FastifyReply) => {
            const { id } = request.params;
            reply.send({products: [{ id }]});
        }
    })
);