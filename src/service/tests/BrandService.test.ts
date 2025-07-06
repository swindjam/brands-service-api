import BrandService from '../BrandService';

jest.mock('../../dao/BrandDao');

describe("BrandService", () => {
    describe('getBrand', () => {
        const brandService = new BrandService();

        it("Should be able to get a brand", async () => {
           const result = await brandService.getBrand('found');

           expect(result).toMatchObject({
               "id": "found",
               "name": "found the brand",
           });
        });

        it("Should be unable to get a brand", async () => {
            const result = await brandService.getBrand('nope');

            expect(result).toBe(undefined);
        });
    });
});