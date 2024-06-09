\c checklistsDB;

DROP FUNCTION IF EXISTS addUser(VARCHAR, VARCHAR, VARCHAR, VARCHAR);
DROP FUNCTION IF EXISTS loadSingleUserById(BIGINT);
DROP FUNCTION IF EXISTS loadSingleUserByEmail(VARCHAR);

-- addUser (select * from addUser('matt@test.com','password','Matt','B');)
CREATE OR REPLACE FUNCTION addUser(
    _email VARCHAR,
    _hashed_password VARCHAR,
    _first_name VARCHAR,
    _last_name VARCHAR
) RETURNS TABLE (
    user_id BIGINT,
    email VARCHAR,
    hashed_password VARCHAR,
    first_name VARCHAR,
    last_name VARCHAR,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    INSERT INTO users (email, hashed_password, first_name, last_name, created_at)
    VALUES (_email, _hashed_password, _first_name, _last_name, now())
    RETURNING 
        users.user_id, 
        users.email, 
        users.hashed_password, 
        users.first_name, 
        users.last_name, 
        users.created_at;
END;
$$ LANGUAGE plpgsql;

-- loadSingleUserById (select * from loadSingleUserById(1);)
CREATE OR REPLACE FUNCTION loadSingleUserById(
    _user_id BIGINT
) RETURNS TABLE (
    user_id BIGINT,
    email VARCHAR,
    hashed_password VARCHAR,
    first_name VARCHAR,
    last_name VARCHAR,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        users.user_id, 
        users.email, 
        users.hashed_password, 
        users.first_name, 
        users.last_name, 
        users.created_at
    FROM users
    WHERE users.user_id = _user_id;
END;
$$ LANGUAGE plpgsql;

-- loadSingleUserByEmail (select * from loadSingleUserByEmail('matt@test.com');)
CREATE OR REPLACE FUNCTION loadSingleUserByEmail(
    _email VARCHAR
) RETURNS TABLE (
    user_id BIGINT,
    email VARCHAR,
    hashed_password VARCHAR,
    first_name VARCHAR,
    last_name VARCHAR,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        users.user_id, 
        users.email, 
        users.hashed_password, 
        users.first_name, 
        users.last_name, 
        users.created_at
    FROM users
    WHERE users.email = _email;
END;
$$ LANGUAGE plpgsql;
