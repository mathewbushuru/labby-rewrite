\c checklistsDB;

DROP FUNCTION IF EXISTS createTasks();

CREATE OR REPLACE FUNCTION createTasks() RETURNS void AS $$
BEGIN
    DROP TABLE IF EXISTS tasks;
    CREATE TABLE tasks (
        task_id BIGSERIAL PRIMARY KEY,
        task_name VARCHAR(100) NOT NULL,
        task_description VARCHAR(255) NOT NULL,
        task_category VARCHAR(20) DEFAULT 'adopt-me',
        fk_task_creator_id BIGINT NOT NULL,
        task_colour_id SMALLINT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        FOREIGN KEY (fk_task_creator_id) REFERENCES users(user_id) ON DELETE CASCADE
    );
END;
$$ LANGUAGE plpgsql;

SELECT createTasks();
