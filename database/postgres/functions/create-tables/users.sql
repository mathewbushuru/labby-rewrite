\c labbyRewriteDB;

DROP FUNCTION IF EXISTS createUsers();

CREATE OR REPLACE FUNCTION createUsers() RETURNS void AS $$
BEGIN
    DROP TABLE IF EXISTS labby_tasks;         -- has fk to user_id
    DROP TABLE IF EXISTS labby_users;
    CREATE TABLE labby_users (
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
