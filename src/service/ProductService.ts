import ProductDao from '../dao/ProductDao';
import { Product } from '../types/Product';
import { Brand } from '../types/Brand';

export default class ProductService {

    productDao: ProductDao;

    constructor(productDao = new ProductDao()) {
        this.productDao = productDao;
    }

    getProductsForBrand(brand: Brand): Product[] {
        const productIds = [
            ...brand.products,
            ...brand.consolidated_products
        ];
        return this.productDao.getProducts(productIds);
    }

    getProduct(id: string): Product|undefined {
        return this.productDao.getProduct(id);
    }
}