# knowledgebase

[![CircleCI](https://circleci.com/gh/bennettbuchanan/knowledgebase.svg?style=shield&circle-token=5d5d6c8035a90b5bf566c8a589484b74e862e234)](https://circleci.com/gh/bennettbuchanan/knowledgebase)

Learn and share software engineering knowledge in real life.

## Quickstart

Install dependencies:

```
$ yarn
```

Start the mysql server. Then add the database and tables:

```
$ mysql.server start
$ mysql -u root < ./sql/init.sql
$ node_modules/db-migrate/bin/db-migrate up
```

## Testing

```
$ yarn test
```
