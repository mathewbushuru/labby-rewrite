USE `checklistsDB`;

DROP PROCEDURE IF EXISTS `addUser`;

DELIMITER $$

CREATE PROCEDURE `addUser` (
    IN `_email` VARCHAR(255),
    IN `_hashed_password` VARCHAR(255)
)
BEGIN
INSERT INTO `users` (
    `email`,
    `hashed_password`
)
VALUES (
    `_email`,
    `_hashed_password`
) ON DUPLICATE KEY UPDATE 
    users.email = _email;
END$$

DELIMITER ;

CALL addUser('matt@test.com', 'Tester123');
