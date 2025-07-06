import StoreDao from "../dao/StoreDao";
import { Brand } from "../types/Brand";
import { Store } from "../types/Store";

export default class StoreService {

    storeDao: StoreDao;

    constructor(storeDao = new StoreDao()) {
        this.storeDao = storeDao;
    }

    async getStoresForBrand(brand: Brand): Promise<Store[]> {
        return await this.storeDao.getStoresForBrand(brand);
    }
}