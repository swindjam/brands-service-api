import { Brand } from '../types/Brand';
import getStream from '../utils/getStream';

export default class BrandDao {

    async getBrand(id: string): Promise<Brand|undefined> {
        try {
            const stream = getStream();
            for await (const chunk of stream) {
                if(chunk.key === 'data') {
                    stream.destroy();
                    return chunk.value.find((brand: Brand) => brand.id === id) as Brand;
                }
            }
        } catch (error: unknown) {
            console.error(`Error finding the brand: ${error}`);
            throw error;
        }
        return undefined;
    }
}