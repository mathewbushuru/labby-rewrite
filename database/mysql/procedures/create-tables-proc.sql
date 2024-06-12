USE `labbyRewriteDB`;

DROP TABLE IF EXISTS `labby_tasks`;
DROP TABLE IF EXISTS `labby_users`;

CALL createUsers();
CALL createTasks();