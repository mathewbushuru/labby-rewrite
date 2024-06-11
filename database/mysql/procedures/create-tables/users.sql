USE `labbyRewriteDB`;

DELIMITER $$

DROP PROCEDURE IF EXISTS `createUsers`;
CREATE PROCEDURE `createUsers` ()
BEGIN
DROP TABLE IF EXISTS `labby_tasks`;       -- has fk to user_id
DROP TABLE IF EXISTS `labby_users`;
CREATE TABLE `labby_users` (
    user_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT(now())
);
END $$

DELIMITER ;

CALL createUsers();
