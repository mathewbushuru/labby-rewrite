USE `checklistsDB`;

DROP PROCEDURE IF EXISTS `addTask`;
DROP PROCEDURE IF EXISTS `loadSingleTaskById`;

DELIMITER $$

-- addTask
CREATE PROCEDURE `addTask` (
    IN _task_name VARCHAR(100),
    IN _task_description VARCHAR(255),
    IN _fk_task_creator_id BIGINT UNSIGNED,
    IN _task_colour_id TINYINT UNSIGNED
)
BEGIN
    INSERT INTO `tasks` (
        `task_name`,
        `task_description`,
        `fk_task_creator_id`,
        `task_colour_id`
    )
    VALUES (
        `_task_name`,
        `_task_description`,
        `_fk_task_creator_id`,
        `_task_colour_id`
    );
    SELECT * FROM `tasks` WHERE `task_id` = LAST_INSERT_ID();
END $$

-- loadSingleTaskById
CREATE PROCEDURE `loadSingleTaskById` (
    IN `_task_id` BIGINT UNSIGNED
)
BEGIN 
    SELECT * from tasks WHERE task_id = _task_id;
END $$

DELIMITER ;