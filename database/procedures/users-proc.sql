USE `checklistsDB`;

DROP PROCEDURE IF EXISTS `addUser`;
DROP PROCEDURE IF EXISTS `loadSingleUserById`;
DROP PROCEDURE IF EXISTS `loadSingleUserByEmail`;

DELIMITER $$

-- addUser
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
);
END $$

-- loadSingleUserById
CREATE PROCEDURE `loadSingleUserById` (
    IN `_user_id` BIGINT UNSIGNED
)
BEGIN
SELECT * FROM users WHERE user_id = _user_id;
END $$

-- loadSingleUserByEmail
CREATE PROCEDURE `loadSingleUserByEmail` (
    IN `_email` VARCHAR(255)
)
BEGIN
SELECT * FROM users WHERE email = _email;
END $$

DELIMITER ;