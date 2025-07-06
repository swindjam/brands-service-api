import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import { Type } from '@fastify/type-provider-typebox'
import BrandService from "../../../../service/BrandService";
import ProductService from "../../../../service/ProductService";

export default async (fastify: FastifyInstance) => (
    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            response: {
                200: Type.Object({
                    products: Type.Array(
                        Type.Object({
                            id: Type.String()
                            // ...other product properties
                        })
                    )
                }),
                404: Type.String()
            }
        },
        handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
            const {id} = request.params;

            const brandService = new BrandService();
            const productService = new ProductService();

            // get the _id, then get the _id based on it
            const brand = await brandService.getBrand(id);
            if (brand) {
                const products = await productService.getProductsForBrand(brand);

                reply.statusCode = 200;
                reply.send(JSON.stringify({products}));
            } else {
                reply.statusCode = 404;
            }
        }
    })
);