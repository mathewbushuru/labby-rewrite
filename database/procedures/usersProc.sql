-- mysql -u username -p -> source path/to/script.sql

USE `checklistsDB`;

DROP PROCEDURE IF EXISTS `addUser`;

DELIMITER $$

CREATE PROCEDURE `addUser` (
    IN `_user_id` VARCHAR(50),
    IN `_email` VARCHAR(255),
    IN `_hashed_password` VARCHAR(255)
)
BEGIN
INSERT INTO `users` (
    `email`,
    `hashed_password`,
    `user_id`
)
VALUES (
    `_email`,
    `_hashed_password`,
    `_user_id`
) ON DUPLICATE KEY UPDATE 
    users.user_id = _user_id,
    users.email = _email;
END$$

DELIMITER ;