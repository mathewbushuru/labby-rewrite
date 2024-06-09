##### Initializing the database locally

- Install MySQL
- On your terminal `mysql -u username -p`
- In the MySQL shell, `USE checklistsDB`
- Run database scripts in the shell `source path/to/script.sql`

##### Creating database tables for first time (order)

1. `procedures/create-tables/users.sql`
2. `procedures/create-tables/tasks.sql`

##### Reset all database tables (delete then create)

- `procedures/create-tables-proc.sql`