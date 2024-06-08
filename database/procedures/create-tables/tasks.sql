USE `checklistsDB`;

DELIMITER $$

DROP PROCEDURE IF EXISTS `createTasks`;
CREATE PROCEDURE `createTasks`()
BEGIN
DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks`(
    task_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    task_name VARCHAR(100) NOT NULL,
    task_description VARCHAR(255) NOT NULL,
    fk_task_creator_id BIGINT UNSIGNED NOT NULL,
    task_colour_id TINYINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT(now()),
    FOREIGN KEY (`fk_task_creator_id`) REFERENCES users(`user_id`) ON DELETE CASCADE
);
END$$

DELIMITER ;

CALL createTasks();