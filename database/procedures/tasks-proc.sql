USE `checklistsDB`;

DROP PROCEDURE IF EXISTS `addTask`;

DELIMITER $$

-- addTask (TODO: select query returns [] on some queries, use direct db calls for now)
CREATE PROCEDURE `addTask` (
    IN _task_name VARCHAR(100),
    IN _task_description VARCHAR(255),
    IN _task_category VARCHAR(20),
    IN _fk_task_creator_id BIGINT UNSIGNED,
    IN _task_colour_id TINYINT UNSIGNED
)
BEGIN
    INSERT INTO tasks (
        task_name,
        task_description,
        task_category,
        fk_task_creator_id,
        task_colour_id
    )
    VALUES (
        _task_name,
        _task_description,
        _task_category,
        _fk_task_creator_id,
        _task_colour_id
    );
    SELECT * FROM tasks WHERE task_id = LAST_INSERT_ID();
END $$

DELIMITER ;