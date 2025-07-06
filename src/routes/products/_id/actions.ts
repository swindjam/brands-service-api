import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import { Type } from '@fastify/type-provider-typebox'
import ProductService from "../../../service/ProductService";

export default async (fastify: FastifyInstance) => (
    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            response: {
                200: Type.Object({
                    id: Type.String()
                    // ...other product properties
                }),
                404: Type.String()
            }
        },
        handler: async (request: FastifyRequest<{ Params: {  id: string } }>, reply: FastifyReply) => {
            const { id } = request.params;


            const productService = new ProductService();

            const product = await productService.getProduct(id);
            if(product) {
                reply.statusCode = 200;
                reply.send(JSON.stringify(product));
            } else {
                reply.statusCode = 404;
            }
        }
    })
);