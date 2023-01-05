# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `npm install` in your terminal at the project root.

## Dev mode
run `npm run create-dev-db` to create database `storefront` and run migrations on dev database. To run dev server run `npm run start`

## Test mode
To run test `npm test`, create test database by running `npm run create-test-db` to create database `storefront_test` and run migrations on test database

### Environment variables 
To satisfy Udacity requirements, the following environment variable are needed.
```
NODE_ENV=dev

# DB VARIABLES
POSTGRES_HOST=localhost
POSTGRES_DB=storefront
POSTGRES_TEST_DB=storefront_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=coldkill
JWT_SECRET=gradeur