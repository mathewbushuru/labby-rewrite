-- \c labbyRewriteDB;

DROP FUNCTION IF EXISTS createTasks();

CREATE OR REPLACE FUNCTION createTasks() RETURNS void AS $$
BEGIN
    DROP TABLE IF EXISTS labby_tasks;
    CREATE TABLE labby_tasks (
        task_id BIGSERIAL PRIMARY KEY,
        task_name VARCHAR(100) NOT NULL,
        task_description VARCHAR(255) NOT NULL,
        task_category VARCHAR(20) DEFAULT 'adopt-me',
        task_category_position SMALLINT NOT NULL,
        fk_task_creator_id BIGINT NOT NULL,
        task_colour_id SMALLINT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        FOREIGN KEY (fk_task_creator_id) REFERENCES labby_users(user_id) ON DELETE CASCADE
    );
END;
$$ LANGUAGE plpgsql;

SELECT createTasks();
