/* eslint-disable */
// ESLint disabled as this runs directly in Mongo
import { data as brands } from './data/brands.json';

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