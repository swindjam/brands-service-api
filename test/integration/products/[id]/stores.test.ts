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

describe('/products/_id/stores', () => {
    let app: FastifyInstance;

    beforeAll(() => {
        app = buildApp();
    });

    afterAll(() => {
        app.close();
    });

    describe('2xx', () => {
        getStreamDefaultMock.mockImplementation(getStreamMock);

        it('Should fetch products by product id', async () => {
            const response = await app.inject({
                method: 'GET',
                url: '/products/5a3fe6f7-7796-44ca-84fe-70d4f751527d/stores'
            });
            expect(response.statusCode).toBe(200);

            const { stores } = JSON.parse(response.body);
            expect(stores).toHaveLength(86);
            expect(stores[0]).toMatchObject({
                "id": "15af2cdc-f352-11e8-80cd-02e611b48058",
                "brand_id": "5a4e6d14-53d4-4583-bd6b-49f81b021d24",
                "name": "Vue Inverness",
            });
        });
    });

    describe('4xx', () => {
       it('Should 404 when unable to fetch a list of _id by brand id', async () => {
           const response = await app.inject({
               method: 'GET',
               url: '/products/unknown/stores'
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
                url: '/products/5a3fe6f7-7796-44ca-84fe-70d4f751527d/stores'
            });
            expect(response.statusCode).toBe(503);
        });

        it('Should 500 when an unknown error occurs', async () => {
            getStreamDefaultMock.mockImplementationOnce(() => {
                throw new Error('aaa')
            });

            const response = await app.inject({
                method: 'GET',
                url: '/products/5a3fe6f7-7796-44ca-84fe-70d4f751527d/stores'
            });
            expect(response.statusCode).toBe(500);
        });
    });
});