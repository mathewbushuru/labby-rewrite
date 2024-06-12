-- psql -U username -W -d checklistsDB

-- show databases
SELECT datname FROM pg_database;

-- show tables (\dt in psql)
SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public';


