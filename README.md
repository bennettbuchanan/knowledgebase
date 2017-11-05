# knowledgebase

[![CircleCI](https://circleci.com/gh/bennettbuchanan/knowledgebase.svg?style=shield&circle-token=5d5d6c8035a90b5bf566c8a589484b74e862e234)](https://circleci.com/gh/bennettbuchanan/knowledgebase)

Learn and share software engineering skills in real life.

## Quickstart

Install dependencies:

```sh
yarn install
```

Start the mysql server:

```sh
mysql.server start
```

Initiate the development database:

```sh
yarn init:dev
```

Add tables to the database:

```sh
yarn migrate_up:dev
```

Start the API:

```sh
yarn start_api:dev
```

Build sources with webpack:

```sh
yarn build
```

Run the development server:

```sh
yarn start_web:dev
```

## Testing

Start the mysql server:

```sh
mysql.server start
```

Start the API in testing mode:

```sh
yarn start_api:test
```

Run unit and functional tests:

```sh
NODE_ENV=test yarn test
```
