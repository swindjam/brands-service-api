import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";

export default async (fastify: FastifyInstance) => (
    fastify.get(
        '/health',
        async (request: FastifyRequest, reply: FastifyReply) => {
            reply.send({ status: 'health ok' });
        }
    )
);