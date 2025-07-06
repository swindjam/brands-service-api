# Brands Service API

This is an API to return data on brands, and their associated products and stores.

# Overview

The data is stored in` src/brands.json` (with an extended version in `src/brands-generated.json`).

*Note*: the extended data includes all the original data, with generated data added for the stores, brands and products to make a larger dataset.

The following diagram shows the structure and relationships for this data.

// TODO insert diagram

# Architecture

The app code is located in `src`, starting from `app.ts`. Below is an API architecture diagram

// TODO insert diagram

# Running the app

To run the app, run `docker-compose up` from the route directory. This will start a node instance that will run the API and rebuild on changes to the `src` code.

The node API has a memory restriction in place, to test scalability with a larger data set (i.e. that the app will nor suffer an OOM).

# Testing the app

There are unit and integration tests setup for the API.

To run the unit tests, run `npm test:unit`

To run the integration tests, run `npm run test:integration`