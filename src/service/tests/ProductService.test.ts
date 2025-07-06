import ProductService from '../ProductService';

jest.mock('../../dao/ProductDao');

describe("ProductService", () => {
    const productService = new ProductService();

    describe('getProductsForBrand', () => {

        it("Should be able to get products", async () => {
            const result = await productService.getProductsForBrand({
                id: 'brand',
                name: 'brand',
                stores: [],
                products: ['found'],
                consolidated_products: ['consolidated']
            });

            expect(result[0]).toMatchObject({
                id: 'found',
                name: 'product'
            });
            expect(result[1]).toMatchObject({
                id: 'consolidated',
                name: 'consolidated product'
            });
        });
    });

    describe('getProduct', () => {
        it("Should be able to get a product", async () => {
            const result = await productService.getProduct('found');

            expect(result).toMatchObject({
                id: 'found',
                name: 'product'
            });
        });

        it("Should be unable to get a product", async () => {
            const result = await productService.getProduct('nope');

            expect(result).toBe(undefined);
        });
    });
});