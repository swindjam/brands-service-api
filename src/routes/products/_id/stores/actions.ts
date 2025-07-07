import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import { Type } from '@fastify/type-provider-typebox'
import ProductService from "../../../../service/ProductService";
import StoreService from "../../../../service/StoreService";
import BrandService from "../../../../service/BrandService";
import StreamAccessError from "../../../../utils/StreamAccessError";

export default async (fastify: FastifyInstance) => (
    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: Type.String()
                }
            },
            response: {
                200: Type.Object({
                    stores: Type.Array(
                        Type.Object({
                            id: Type.String(),
                            brand_id: Type.String(),
                            name: Type.String()
                        })
                    )
                }),
                404: Type.String(),
                500: Type.String(),
            }
        },
        handler: async (request: FastifyRequest<{ Params: {  id: string } }>, reply: FastifyReply) => {
            try {
                const { id } = request.params;

                const productService = new ProductService();
                const brandService = new BrandService();
                const storeService = new StoreService();

                const product = await productService.getProduct(id);
                const brand = product ? await brandService.getBrand(product.brand_id) : null;

                if(brand) {
                    const stores = brand ? await storeService.getStoresForBrand(brand) : null;
                    reply.statusCode = 200;
                    reply.send({stores});
                } else {
                    reply.statusCode = 404;
                }
            } catch(e) {
                if(e instanceof StreamAccessError) {
                    // Error accessing the stream
                    reply.statusCode = 503;
                } else {
                    // Unknown error
                    reply.statusCode = 500;
                }
            }
        }
    })
);