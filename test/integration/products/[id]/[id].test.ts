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

describe('/products/_id', () => {
    let app: FastifyInstance;

    beforeEach(() => {
        app = buildApp();
    });

    afterEach(() => {
        app.close();
    });

    describe('2xx', () => {
        getStreamDefaultMock.mockImplementation(getStreamMock);

        it('Should fetch the product by id', async () => {
            const response = await app.inject({
                method: 'GET',
                url: '/products/5a3fe6f7-7796-44ca-84fe-70d4f751527d'
            });
            expect(response.statusCode).toBe(200);

            const body = JSON.parse(response.body);
            expect(body).toMatchObject({
                "id": "5a3fe6f7-7796-44ca-84fe-70d4f751527d",
                "label": "One Cinema Ticket",
            });
        });
    });

    describe('4xx', () => {
       it('Should 404 when unable to fetch a product', async () => {
           const response = await app.inject({
               method: 'GET',
               url: '/products/unknown'
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
                url: '/products/5a3fe6f7-7796-44ca-84fe-70d4f751527d'
            });
            expect(response.statusCode).toBe(503);
        });

        it('Should 500 when an unknown error occurs', async () => {
            getStreamDefaultMock.mockImplementationOnce(() => {
                throw new Error('aaa')
            });

            const response = await app.inject({
                method: 'GET',
                url: '/products/5a3fe6f7-7796-44ca-84fe-70d4f751527d'
            });
            expect(response.statusCode).toBe(500);
        });
    });
});