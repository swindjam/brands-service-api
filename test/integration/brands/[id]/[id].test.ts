import buildApp from '../../../../src/app';
import {FastifyInstance} from "fastify";
import StreamAccessError from "../../../../src/utils/StreamAccessError";
import getStreamMock from '../../../../src/utils/__mocks__/getStream';

const getStreamDefaultMock = jest.fn(() => 'mocked baz');
jest.mock('../../../../src/utils/getStream', () => {
    return {
        __esModule: true,
        default: getStreamDefaultMock
    };
});

describe('/brands/_id', () => {
    let app: FastifyInstance;

    beforeAll(() => {
        app = buildApp();
    });

    afterAll(() => {
        app.close();
    });

    describe('2xx', () => {
        getStreamDefaultMock.mockImplementation(getStreamMock);

        it('Should fetch the brand by id', async () => {
            const response = await app.inject({
                method: 'GET',
                url: '/brands/5a4e6d14-53d4-4583-bd6b-49f81b021d24'
            });
            expect(response.statusCode).toBe(200);

            const body = JSON.parse(response.body);
            expect(body).toMatchObject({
                "id": "5a4e6d14-53d4-4583-bd6b-49f81b021d24",
                "name": "Vue Cinemas",
            });
        });
    });

    describe('4xx', () => {
       it('Should 404 when unable to fetch a brand', async () => {
           const response = await app.inject({
               method: 'GET',
               url: '/brands/unknown'
           });
           expect(response.statusCode).toBe(404);
       });
    });

    describe('5xx', () => {
        it('Should 503 when unable to get the stream', async () => {
            getStreamDefaultMock.mockImplementationOnce(() => {
                throw new StreamAccessError('');
            });

            const response = await app.inject({
                method: 'GET',
                url: '/brands/5a4e6d14-53d4-4583-bd6b-49f81b021d24'
            });
            expect(response.statusCode).toBe(503);
        });

        it('Should 500 when an unknown error occurs', async () => {
            getStreamDefaultMock.mockImplementationOnce(() => {
                throw new Error('aaa')
            });

            const response = await app.inject({
                method: 'GET',
                url: '/brands/5a4e6d14-53d4-4583-bd6b-49f81b021d24'
            });
            expect(response.statusCode).toBe(500);
        });
    });
});