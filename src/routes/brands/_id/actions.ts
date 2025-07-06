import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import { Type } from '@fastify/type-provider-typebox'
import BrandService from "../../../service/BrandService";

export default async (fastify: FastifyInstance) => (
    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            response: {
                200: Type.Object({
                    id: Type.String()
                    // ...other brand properties
                }),
                404: Type.String()
            }
        },
        handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
            const {id} = request.params;

            const brandService = new BrandService();

            const brand = await brandService.getBrand(id);
            if (brand) {
                reply.statusCode = 200;
                reply.send(JSON.stringify(brand));
            } else {
                reply.statusCode = 404;
            }
        }
    })
);