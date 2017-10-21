# knowledgebase

[![CircleCI](https://circleci.com/gh/bennettbuchanan/knowledgebase.svg?style=shield&circle-token=5d5d6c8035a90b5bf566c8a589484b74e862e234)](https://circleci.com/gh/bennettbuchanan/knowledgebase)

Learn and share software engineering skills in real life.

## Quickstart

Install dependencies:

```
$ yarn install
```

Start the mysql server:

```
$ mysql.server start
```

Add the database and tables:

```
$ yarn init
$ yarn migrate:up
```

Start the API:

```
$ yarn start:dev
```

## Testing

Start the API in testing mode:

```
$ yarn start:test
```

Run unit and functional tests:

```
$ yarn test
```
