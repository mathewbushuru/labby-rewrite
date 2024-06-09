\c checklistsDB;

DROP FUNCTION IF EXISTS createUsers();

CREATE OR REPLACE FUNCTION createUsers() RETURNS void AS $$
BEGIN
    DROP TABLE IF EXISTS users;
    CREATE TABLE users (
        user_id BIGSERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        hashed_password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
END;
$$ LANGUAGE plpgsql;

SELECT createUsers();
