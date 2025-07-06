"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../../../src/app");
jest.mock('../../../../src/utils/getStream');
describe('/brands/_id/products', () => {
    let app;
    beforeAll(() => {
        app = (0, app_1.default)();
    });
    afterAll(() => {
        app.close();
    });
    describe('2xx', () => {
        it('Should fetch _id by brand id, for a brand that has _id', async () => {
            const response = await app.inject({
                method: 'GET',
                url: '/brands/5a4e6d14-53d4-4583-bd6b-49f81b021d24/products'
            });
            expect(response.statusCode).toBe(200);
            const { products } = JSON.parse(response.body);
            expect(products).toHaveLength(1);
            expect(products[0]).toMatchObject({
                "id": "5a3fe6f7-7796-44ca-84fe-70d4f751527d",
                "brand_id": "5a4e6d14-53d4-4583-bd6b-49f81b021d24",
                "label": "One Cinema Ticket",
            });
        });
        it('Should fetch _id by brand id, for a brand that has consolidated _id', async () => {
            const response = await app.inject({
                method: 'GET',
                url: '/brands/69be9b8c-5b95-4792-a05c-652d2f15a62f/products'
            });
            expect(response.statusCode).toBe(200);
            const { products } = JSON.parse(response.body);
            expect(products).toHaveLength(1);
            expect(products[0]).toMatchObject({
                "id": "26f7a82a-30a8-44e4-93cb-499a256d0ce9",
                "brand_id": "66462cd6-e43c-4ab6-8e6f-004ca189e4b9",
                "label": "Coffee",
            });
        });
        it('Should fetch _id by brand id, fora brand that has _id and consolidated _id', async () => {
            const response = await app.inject({
                method: 'GET',
                url: '/brands/15538f17-95bd-4cc4-9cf3-893a21d16028/products'
            });
            expect(response.statusCode).toBe(200);
            const { products } = JSON.parse(response.body);
            expect(products).toHaveLength(2);
            expect(products[0]).toMatchObject({
                "id": "26f7a82a-30a8-44e4-93cb-499a256d0ce9",
                "brand_id": "66462cd6-e43c-4ab6-8e6f-004ca189e4b9",
                "label": "Coffee",
            });
            expect(products[1]).toMatchObject({
                "id": "66ed94ca-64cd-4190-81f9-ef1e5d157b4e",
                "brand_id": "15538f17-95bd-4cc4-9cf3-893a21d16028",
                "label": "No QRs",
            });
        });
    });
    describe('4xx', () => {
        it('Should 404 when unable to fetch a list of _id by brand id', async () => {
            const response = await app.inject({
                method: 'GET',
                url: '/brands/unknown/products'
            });
            expect(response.statusCode).toBe(404);
        });
    });
});
