import fastify, {FastifyReply, FastifyRequest} from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import fastifyCaching from '@fastify/caching';
import autoLoad from '@fastify/autoload'
import { join } from 'node:path'

export default () => {
    const app = fastify({
        logger: true
    });

    app.withTypeProvider<TypeBoxTypeProvider>()

    // Setup default caching of 5 seconds as a demo
    app.register(
        fastifyCaching,
        { privacy: fastifyCaching.privacy.PUBLIC, expiresIn: 5, cacheSegment: 'mainCache'}
    );

    // Setup routes dynamically
    app.register(autoLoad, {
        dir: join(__dirname, 'routes'),
        routeParams: true
    });

    app.setErrorHandler(async (err, request, reply) => {
        if (err.validation) {
            reply.code(403)
            return err.message
        }
        request.log.error({ err })
        reply.code(err.statusCode || 500)

        return 'Sorry. An error occurred while processing your request.';
    });

    return app;
};