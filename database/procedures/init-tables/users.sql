USE `checklistsDB`;

DROP TABLE IF EXISTS `users`;
DROP PROCEDURE IF EXISTS `createUsers`;

DELIMITER $$

CREATE PROCEDURE `createUsers` ()
BEGIN
CREATE TABLE `users` (
    user_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL
);
END$$

DELIMITER ;

CALL createUsers();
