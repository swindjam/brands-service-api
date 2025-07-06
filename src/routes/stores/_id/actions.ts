import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import { Type } from '@fastify/type-provider-typebox'
import StoreService from "../../../service/StoreService";

export default async (fastify: FastifyInstance) => (
    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            response: {
                200: Type.Object({
                    id: Type.String()
                    // ...other store properties
                }),
                404: Type.String()
            }
        },
        handler: async (request: FastifyRequest<{ Params: {  id: string } }>, reply: FastifyReply) => {
            const { id } = request.params;

            const storeService = new StoreService();

            const store = await storeService.getStore(id);
            if(store) {
                reply.statusCode = 200;
                reply.send(JSON.stringify(store));
            } else {
                reply.statusCode = 404;
            }
        }
    })
);