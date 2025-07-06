import {Brand} from "../../types/Brand";
import {Store} from "../../types/Store";

export default class StoreDao {

    async getStoresForBrand(brand: Brand): Promise<Store[]> {
        if(brand.id === 'found') {
            return [
                {
                    id: 'store',
                    brand_id: 'found',
                    name: 'store name'
                }
            ];
        }
        return [];
    }
}