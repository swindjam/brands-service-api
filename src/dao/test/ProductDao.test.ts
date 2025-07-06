import ProductDao from '../ProductDao';

jest.mock('../../utils/getStream');

describe("ProductDao", () => {
    const productDao = new ProductDao();

    describe('getProducts', () => {

        it("Should be able to get a product", async () => {
           const result = await productDao.getProducts(["5a3fe6f7-7796-44ca-84fe-70d4f751527d", "26f7a82a-30a8-44e4-93cb-499a256d0ce9"]);

           expect(result).toHaveLength(2);
           expect(result[0]).toMatchObject({
               "id": "5a3fe6f7-7796-44ca-84fe-70d4f751527d",
               "label": "One Cinema Ticket",
           });
            expect(result[1]).toMatchObject({
                "id": "26f7a82a-30a8-44e4-93cb-499a256d0ce9",
                "label": "Coffee",
            });
        });
    });

    describe('getProduct', () => {
        it("Should be able to get a product", async () => {
            const result = await productDao.getProduct('5a3fe6f7-7796-44ca-84fe-70d4f751527d');

            expect(result).toMatchObject({
                "id": "5a3fe6f7-7796-44ca-84fe-70d4f751527d",
                "label": "One Cinema Ticket",
            });
        });

        it("Should be unable to get a product", async () => {
            const result = await productDao.getProduct('nope');

            expect(result).toBe(undefined);
        });
    });
});