##### Initializing the database locally

- Install MySQL
- On your terminal `mysql -u username -p`
- In the MySQL shell, `USE labbyRewriteDB`
- Run database scripts in the shell `source path/to/script.sql`

##### Creating database tables for first time (order)

1. `source mysql/procedures/create-tables/users.sql`
2. `source mysql/procedures/create-tables/tasks.sql`

##### Reset all database tables (delete then create)

- `source mysql/procedures/create-tables-proc.sql`