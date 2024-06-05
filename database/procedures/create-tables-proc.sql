USE `checklistsDB`;

DROP TABLE IF EXISTS `tasks`;
DROP TABLE IF EXISTS `users`;

CALL createUsers();
CALL createTasks();