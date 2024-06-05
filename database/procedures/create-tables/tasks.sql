USE `checklistsDB`;

DELIMITER $$

DROP PROCEDURE IF EXISTS `createTasks`;
CREATE PROCEDURE `createTasks`()
BEGIN
DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks`(
    task_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    task_name VARCHAR(100),
    task_description VARCHAR(255),
    fk_task_creator_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT(now()),
    FOREIGN KEY (`fk_task_creator_id`) REFERENCES users(`user_id`) ON DELETE CASCADE
);
END$$

DELIMITER ;

CALL createTasks();