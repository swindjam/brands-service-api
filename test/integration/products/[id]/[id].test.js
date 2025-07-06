"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../../../src/app");
jest.mock('../../../../src/utils/getStream');
describe('/products/_id', () => {
    let app;
    beforeAll(() => {
        app = (0, app_1.default)();
    });
    afterAll(() => {
        app.close();
    });
    describe('2xx', () => {
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
});
