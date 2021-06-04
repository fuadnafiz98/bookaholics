# React.js Node.js Passport.js Authentication Example


## Knex Setup 

- make `knexfile.ts` 

  `npx knex init -x ts`
- make migrations 

  `npx knex migrate:make create_users -x ts`
- run migrations

  `npx knex migrate:latest`

