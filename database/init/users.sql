USE `checklistsDB`;

DROP TABLE IF EXISTS `users`;
DROP PROCEDURE IF EXISTS `createUsers`;

DELIMITER $$

CREATE PROCEDURE `createUsers` ()
BEGIN
CREATE TABLE `users` (
    user_id VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    hashed_password VARCHAR(255),
    PRIMARY KEY (`user_id`)
);
END$$

DELIMITER ;