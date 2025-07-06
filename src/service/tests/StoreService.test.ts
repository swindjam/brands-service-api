import StoreService from '../StoreService';

jest.mock('../../dao/StoreDao');

describe("StoreService", () => {
    const storeService = new StoreService();

    describe('getStoresForBrand', () => {
        it("Should be able to get stores for a brand", async () => {
            const result = await storeService.getStoresForBrand({
                id: 'found',
            });

            expect(result[0]).toMatchObject({
                id: 'store',
                brand_id: 'found',
                name: 'store name'
            });
        });

        it("Should beun able to get stores for a brand", async () => {
            const result = await storeService.getStoresForBrand({
                id: 'nope',
            });

            expect(result).toHaveLength(0);
        });
    });
});