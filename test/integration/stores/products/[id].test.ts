import buildApp from '../../../../src/app';
import {FastifyInstance} from "fastify";

jest.mock('../../../../src/utils/getStream');

describe('/stores/products/[id]', () => {
    let app: FastifyInstance;

    beforeAll(() => {
        app = buildApp();
    });

    afterAll(() => {
        app.close();
    });

    describe('2xx', () => {
        it('Should fetch stores by product id', async () => {
            const response = await app.inject({
                method: 'GET',
                url: '/stores/products/5a3fe6f7-7796-44ca-84fe-70d4f751527d'
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
       it('Should 404 when unable to fetch a list of products by brand id', async () => {
           const response = await app.inject({
               method: 'GET',
               url: '/products/brands/unknown'
           });
           expect(response.statusCode).toBe(404);
       });
    });
});