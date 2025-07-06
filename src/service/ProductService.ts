import ProductDao from '../dao/ProductDao';
import { Product } from '../types/Product';
import { Brand } from '../types/Brand';

export default class ProductService {

    productDao: ProductDao;

    constructor(productDao = new ProductDao()) {
        this.productDao = productDao;
    }

    async getProductsForBrand(brand: Brand): Promise<Product[]> {
        const productIds = [
            ...brand.products,
            ...brand.consolidated_products
        ];
        return await this.productDao.getProducts(productIds);
    }

    async getProduct(id: string): Promise<Product|undefined> {
        return await this.productDao.getProduct(id);
    }
}