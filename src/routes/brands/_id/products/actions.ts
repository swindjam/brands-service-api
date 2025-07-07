import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import { Type } from '@fastify/type-provider-typebox'
import BrandService from "../../../../service/BrandService";
import ProductService from "../../../../service/ProductService";
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
                    products: Type.Array(
                        Type.Object({
                            id: Type.String(),
                            label: Type.String(),
                            brand_id: Type.String(),
                            brand_name: Type.String(),
                            description: Type.String()
                        })
                    )
                }),
                404: Type.String(),
                500: Type.String(),
            }
        },
        handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
            try {
                const {id} = request.params;

                const brandService = new BrandService();
                const productService = new ProductService();

                // get the _id, then get the _id based on it
                const brand = await brandService.getBrand(id);
                if (brand) {
                    const products = await productService.getProductsForBrand(brand);

                    reply.statusCode = 200;
                    reply.send({products});
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