"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../../../src/app");
jest.mock('../../../../src/utils/getStream');
describe('/brands/_id', () => {
    let app;
    beforeAll(() => {
        app = (0, app_1.default)();
    });
    afterAll(() => {
        app.close();
    });
    describe('2xx', () => {
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
});
