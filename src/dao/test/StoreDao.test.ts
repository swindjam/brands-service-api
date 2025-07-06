import StoreDao from '../StoreDao';

jest.mock('../../utils/getStream');

describe("StoreDao", () => {
    describe('getStoresForBrand', () => {
        const storeDao = new StoreDao();

        it("Should be able to get a list of stores for a brand", async () => {
            const result = await storeDao.getStoresForBrand({id: '5a4e6d14-53d4-4583-bd6b-49f81b021d24'});

            expect(result).toHaveLength(86);
            expect(result[0]).toMatchObject({
                "id": "15af2cdc-f352-11e8-80cd-02e611b48058",
                "brand_id": "5a4e6d14-53d4-4583-bd6b-49f81b021d24",
                "name": "Vue Inverness",
            });
        });

        it("Should be unable to get a list of stores", async () => {
            const result = await storeDao.getStoresForBrand({id: 'what?'});

            expect(result).toHaveLength(0);
        });
    });

    describe('getStore', () => {
        const storeDao = new StoreDao();

        it("Should be able to get a store", async () => {
            const result = await storeDao.getStore('15af2cdc-f352-11e8-80cd-02e611b48058');

            expect(result).toMatchObject({
                "id": '15af2cdc-f352-11e8-80cd-02e611b48058',
                "brand_id": "5a4e6d14-53d4-4583-bd6b-49f81b021d24",
                "name": "Vue Inverness",
            });
        });

        it("Should be unable to get a store", async () => {
            const result = await storeDao.getStore('umm');

            expect(result).toBe(undefined);
        });
    });
});