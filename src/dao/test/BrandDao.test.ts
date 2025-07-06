import BrandDao from '../BrandDao';

jest.mock('../../utils/getStream');

describe("BrandDao", () => {
    describe('getBrand', () => {
        const brandDao = new BrandDao();

        it("Should be able to get a brand", async () => {
           const result = await brandDao.getBrand('5a4e6d14-53d4-4583-bd6b-49f81b021d24');

           expect(result).toMatchObject({
              "id": "5a4e6d14-53d4-4583-bd6b-49f81b021d24",
               "name": "Vue Cinemas",
           });
        });

        it("Should be unable to get a brand", async () => {
            const result = await brandDao.getBrand('nope');

            expect(result).toBe(undefined);
        });
    });
});