import StoreDao from "../dao/StoreDao";
import { Brand } from "../types/Brand";
import { Store } from "../types/Store";

export default class StoreService {

    storeDao: StoreDao;

    constructor(storeDao = new StoreDao()) {
        this.storeDao = storeDao;
    }

    getStoresForBrand(brand: Brand): Store[] {
        return this.storeDao.getStoresForBrand(brand);
    }
}