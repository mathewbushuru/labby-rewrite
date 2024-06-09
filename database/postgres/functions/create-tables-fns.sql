\c checklistsDB;

DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;

SELECT createUsers();
SELECT createTasks();