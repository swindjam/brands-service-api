import fastify, {FastifyReply, FastifyRequest} from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import fastifyCaching from '@fastify/caching';
import autoLoad from '@fastify/autoload'
import { join } from 'node:path'

const app = fastify({
    logger: true
})
    .withTypeProvider<TypeBoxTypeProvider>()
    .decorate('verifyUserAndPassword', function (request: FastifyRequest, reply: FastifyReply, done: any) {
        // your validation logic

        console.log('user password')

        done() // pass an error if the authentication fails
    })

// Setup default caching of 5 seconds (would be best not to use this for prod)
app.register(
    fastifyCaching,
    { privacy: fastifyCaching.privacy.NOCACHE, expiresIn: 5, cacheSegment: 'mainCache'},
    // (err) => { if (err) throw err }
);

app.register(autoLoad, {
    dir: join(__dirname, 'routes'),
    routeParams: true
})

app.setErrorHandler(async (err, request, reply) => {
    if (err.validation) {
        reply.code(403)
        return err.message
    }
    request.log.error({ err })
    reply.code(err.statusCode || 500)

    return 'Sorry. An error occurred while processing your request.';
})

const start = async () => {
    try {
        await app.listen({ port: 3000, host: "0.0.0.0" });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();