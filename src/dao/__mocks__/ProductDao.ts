import {Product} from "../../types/Product";

export default class ProductDao {

    async getProducts(ids: string[]): Promise<Product[]> {
        return ids.map(id => {
            switch (id) {
                case 'found':
                    return {
                        id: 'found',
                        name: 'product'
                    };
                case 'consolidated':
                    return {
                        id: 'consolidated',
                        name: 'consolidated product'
                    };
            }
        });
    }

    async getProduct(id: string): Promise<Product|undefined> {

        if(id ==='found') {
            return {
                id: 'found',
                name: 'product'
            };
        }

        return undefined;
    }
}