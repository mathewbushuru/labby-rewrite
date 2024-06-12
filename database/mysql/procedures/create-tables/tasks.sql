USE `labbyRewriteDB`;

DELIMITER $$

DROP PROCEDURE IF EXISTS `createTasks`;
CREATE PROCEDURE `createTasks`()
BEGIN
DROP TABLE IF EXISTS `labby_tasks`;
CREATE TABLE `labby_tasks`(
    task_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    task_name VARCHAR(100) NOT NULL,
    task_description VARCHAR(255) NOT NULL,
    task_category VARCHAR(20) DEFAULT "adopt-me",
    fk_task_creator_id BIGINT UNSIGNED NOT NULL,
    task_colour_id TINYINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT(now()),
    FOREIGN KEY (`fk_task_creator_id`) REFERENCES labby_users(`user_id`) ON DELETE CASCADE
);
END$$

DELIMITER ;

CALL createTasks();