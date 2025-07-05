import { embedded } from '../data/brands.json';
const { products } = embedded;
import { Product } from "../types/Product";

export default class ProductDao {

    getProducts(ids: string[]): Product[] {
        return products.filter((product) => ids.includes(product.id)) as Product[];
    }

    getProduct(id: string): Product|undefined {
        return products.find((product) => product.id === id);
    }
}