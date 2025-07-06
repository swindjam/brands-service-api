import StoreService from '../StoreService';

jest.mock('../../dao/StoreDao');

describe("StoreService", () => {
    const storeService = new StoreService();

    describe('getStoresForBrand', () => {
        it("Should be able to get products for a brand", async () => {
            const result = await storeService.getStoresForBrand({
                id: 'found',
            });

            expect(result[0]).toMatchObject({
                id: 'store',
                brand_id: 'found',
                name: 'store name'
            });
        });

        it("Should beun able to get products for a brand", async () => {
            const result = await storeService.getStoresForBrand({
                id: 'nope',
            });

            expect(result).toHaveLength(0);
        });
    });

    describe('getStore', () => {
        it("Should be able to get a store", async () => {
            const result = await storeService.getStore('found');

            expect(result).toMatchObject({
                id: 'store',
                brand_id: 'found',
                name: 'store name'
            });
        });

        it("Should not be able to get a store", async () => {
            const result = await storeService.getStore({
                id: 'nope',
            });

            expect(result).toBe(undefined);
        });
    });
});