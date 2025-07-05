import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import { Type } from '@fastify/type-provider-typebox'
import ProductService from "../../../../service/ProductService";
import StoreService from "../../../../service/StoreService";
import BrandService from "../../../../service/BrandService";

// Get all store entities for a product by product-id
export default async (fastify: FastifyInstance) => (
    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            response: {
                200: Type.Object({
                    products: Type.Array(
                        Type.Object({
                            id: Type.String() // Brand id
                        })
                    )
                }),
                403: Type.Boolean(),
                404: Type.String(),
                500: Type.Number(),
            }
        },
        handler: async (request: FastifyRequest<{ Params: {  id: string } }>, reply: FastifyReply) => {
            const { id } = request.params;


            const productService = new ProductService();
            const brandService = new BrandService();
            const storeService = new StoreService();

            const product = productService.getProduct(id);
            const brand = product ? await brandService.getBrand(product.brand_id) : null;

            if(brand) {
                const stores = brand ? storeService.getStoresForBrand(brand) : null;
                reply.statusCode = 200;
                reply.send(JSON.stringify({stores}));
            } else {
                reply.statusCode = 404;
            }
        }
    })
);