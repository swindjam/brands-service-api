/* eslint-disable */
// @ts-nocheck
// ESLint and Typescript disabled as this runs directly in Mongo
const data = require('./data/brands.json');
const { brands, embedded } = data;

db.auth('root', 'example');

db.createUser(
    {
        user: 'admin',
        pwd: 'abc123',
        roles: [
            {
                role: 'readWrite',
                db: 'main'
            }
        ]
    }
);

db.brand.insertMany(brands, { writeConcern: 'majority', ordered: true });
db.product.insertMany(embedded.product);
db.store.insertMany(embedded.stores);
