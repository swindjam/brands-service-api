import { Product } from "../types/Product";
import getStream from "../utils/getStream";

export default class ProductDao {

    async getProducts(ids: string[]): Promise<Product[]> {
        const stream = getStream();

        try {
            for await (const chunk of stream) {
                if(chunk.key === 'embedded') {
                    stream.destroy();
                    return chunk.value.products.filter((product: Product) => ids.includes(product.id)) as Product[];
                }
            }
        } catch (error: any) {
            console.error(`Error finding the products: ${error}`);
        }
        return [];
    }

    async getProduct(id: string): Promise<Product|undefined> {
        const stream = getStream();

        try {
            for await (const chunk of stream) {
                if(chunk.key === 'embedded') {
                    stream.destroy();
                    return chunk.value.products.find((product: Product) => product.id === id) as Product;
                }
            }
        } catch (error: any) {
            console.error(`Error finding the product: ${error}`);
        }
        return undefined;
    }
}