import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import { Type } from '@fastify/type-provider-typebox'
import ProductService from "../../../../service/ProductService";
import StoreService from "../../../../service/StoreService";
import BrandService from "../../../../service/BrandService";

export default async (fastify: FastifyInstance) => (
    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            response: {
                200: Type.Object({
                    stores: Type.Array(
                        Type.Object({
                            id: Type.String()
                            // ...other store properties
                        })
                    )
                }),
                404: Type.String()
            }
        },
        handler: async (request: FastifyRequest<{ Params: {  id: string } }>, reply: FastifyReply) => {
            const { id } = request.params;


            const productService = new ProductService();
            const brandService = new BrandService();
            const storeService = new StoreService();

            const product = await productService.getProduct(id);
            const brand = product ? await brandService.getBrand(product.brand_id) : null;

            if(brand) {
                const stores = brand ? await storeService.getStoresForBrand(brand) : null;
                reply.statusCode = 200;
                reply.send(JSON.stringify({stores}));
            } else {
                reply.statusCode = 404;
            }
        }
    })
);