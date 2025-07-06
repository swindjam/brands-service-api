"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../../../src/app");
jest.mock('../../../../src/utils/getStream');
describe('/stores/_id', () => {
    let app;
    beforeAll(() => {
        app = (0, app_1.default)();
    });
    afterAll(() => {
        app.close();
    });
    describe('2xx', () => {
        it('Should fetch the store by id', async () => {
            const response = await app.inject({
                method: 'GET',
                url: '/stores/15af2cdc-f352-11e8-80cd-02e611b48058'
            });
            expect(response.statusCode).toBe(200);
            const body = JSON.parse(response.body);
            expect(body).toMatchObject({
                "id": "15af2cdc-f352-11e8-80cd-02e611b48058",
                "name": "Vue Inverness",
            });
        });
    });
    describe('4xx', () => {
        it('Should 404 when unable to fetch a store', async () => {
            const response = await app.inject({
                method: 'GET',
                url: '/stores/unknown'
            });
            expect(response.statusCode).toBe(404);
        });
    });
});
