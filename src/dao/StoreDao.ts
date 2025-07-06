import { Brand } from "../types/Brand";
import { Store } from "../types/Store";
import getStream from "../utils/getStream";

export default class StoreDao {

    async getStoresForBrand(brand: Brand): Promise<Store[]> {
        const stream = getStream();

        try {
            for await (const chunk of stream) {
                if(chunk.key === 'embedded') {
                    stream.destroy();
                    return chunk.value.stores.filter((store: Store) => store.brand_id === brand.id) as Store[];
                }
            }
        } catch (error: any) {
            console.error(`Error finding the stores: ${error}`);
        }
        return [];
    }
}