import { embedded } from '../data/brands.json';
const { stores } = embedded;
import { Brand } from "../types/Brand";
import { Store } from "../types/Store";

export default class StoreDao {

    getStoresForBrand(brand: Brand): Store[] {
        return stores.filter(store => store.brand_id === brand.id);
    }
}