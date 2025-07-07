import { Product } from "../types/Product";
import getStream from "../utils/getStream";

export default class ProductDao {

    async getProducts(ids: string[]): Promise<Product[]> {
        try {
            const stream = getStream();
            for await (const chunk of stream) {
                if(chunk.key === 'embedded') {
                    stream.destroy();
                    return chunk.value.products.filter((product: Product) => ids.includes(product.id)) as Product[];
                }
            }
        } catch (error: unknown) {
            console.error(`Error finding the products: ${error}`);
            throw error;
        }
        return [];
    }

    async getProduct(id: string): Promise<Product|undefined> {
        try {
            const stream = getStream();
            for await (const chunk of stream) {
                if(chunk.key === 'embedded') {
                    stream.destroy();
                    return chunk.value.products.find((product: Product) => product.id === id) as Product;
                }
            }
        } catch (error: unknown) {
            console.error(`Error finding the product: ${error}`);
            throw error;
        }
        return undefined;
    }
}