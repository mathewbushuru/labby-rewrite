I have replaced some procedures in the MySQL directory with functions in postgres. I am using functions for simpler tasks that don't require advanced transaction control like creating tables

##### Initializing the database locally

- Install MySQL
- On your terminal `psql -U username -W -d checklistsDB`
- Run database scripts in the shell `\i path/to/script.sql`

##### Creating database tables for first time (order)

1. `\i postgres/functions/create-tables/users.sql`