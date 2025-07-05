import BrandDao from '../dao/BrandDao';
import { Brand } from '../types/Brand';

export default class BrandService {

    brandDao: BrandDao;

    constructor(brandDao = new BrandDao()) {
        this.brandDao = brandDao;
    }

    async getBrand(id: string): Promise<Brand|undefined> {
        return this.brandDao.getBrand(id);
    }
}