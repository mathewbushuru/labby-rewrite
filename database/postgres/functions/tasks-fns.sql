\c checklistsDB;

DROP FUNCTION IF EXISTS addTask(VARCHAR, VARCHAR, VARCHAR, BIGINT, SMALLINT);

-- addTask (select * from addTask('Labby','Complete Labby rewrite','in-progress', 1, 3::SMALLINT);)
CREATE OR REPLACE FUNCTION addTask(
    _task_name VARCHAR,
    _task_description VARCHAR,
    _task_category VARCHAR,
    _fk_task_creator_id BIGINT,
    _task_colour_id SMALLINT
) RETURNS TABLE (
    task_id BIGINT,
    task_name VARCHAR,
    task_description VARCHAR,
    task_category VARCHAR,
    fk_task_creator_id BIGINT,
    task_colour_id SMALLINT,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    INSERT INTO tasks (
        task_name, task_description, task_category, fk_task_creator_id, task_colour_id, created_at
    ) VALUES (
        _task_name, _task_description, _task_category, _fk_task_creator_id, _task_colour_id, now()
    )
    RETURNING 
        tasks.task_id,
        tasks.task_name,
        tasks.task_description,
        tasks.task_category,
        tasks.fk_task_creator_id,
        tasks.task_colour_id,
        tasks.created_at;
END;
$$ LANGUAGE plpgsql;