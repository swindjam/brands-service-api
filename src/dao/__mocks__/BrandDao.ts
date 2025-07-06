import { Brand } from '../types/Brand';

export default class BrandDao {

    async getBrand(id: string): Promise<Brand|undefined> {
        if(id === 'found') {
            return {
                id: 'found',
                name: 'found the brand'
            };
        }
        return undefined;
    }
}