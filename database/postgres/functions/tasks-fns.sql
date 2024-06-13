-- \c labbyRewriteDB;

DROP FUNCTION IF EXISTS addTask(VARCHAR, VARCHAR, VARCHAR, SMALLINT, BIGINT, SMALLINT);

-- addTask (select * from addTask('Labby','Complete Labby rewrite','in-progress', 1, 3::SMALLINT);)
CREATE OR REPLACE FUNCTION addTask(
    _task_name VARCHAR,
    _task_description VARCHAR,
    _task_category VARCHAR,
    _task_category_position SMALLINT,
    _fk_task_creator_id BIGINT,
    _task_colour_id SMALLINT
) RETURNS TABLE (
    task_id BIGINT,
    task_name VARCHAR,
    task_description VARCHAR,
    task_category VARCHAR,
    task_category_position SMALLINT,
    fk_task_creator_id BIGINT,
    task_colour_id SMALLINT,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    INSERT INTO labby_tasks (
        task_name, task_description, task_category, task_category_position, fk_task_creator_id, task_colour_id, created_at
    ) VALUES (
        _task_name, _task_description, _task_category, _task_category_position, _fk_task_creator_id, _task_colour_id, now()
    )
    RETURNING 
        labby_tasks.task_id,
        labby_tasks.task_name,
        labby_tasks.task_description,
        labby_tasks.task_category,
        labby_tasks.task_category_position,
        labby_tasks.fk_task_creator_id,
        labby_tasks.task_colour_id,
        labby_tasks.created_at;
END;
$$ LANGUAGE plpgsql;