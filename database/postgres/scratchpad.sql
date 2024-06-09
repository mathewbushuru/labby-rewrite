-- psql -U username -W -d checklistsDB

-- show databases
SELECT datname FROM pg_database;

-- show tables
SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public';
