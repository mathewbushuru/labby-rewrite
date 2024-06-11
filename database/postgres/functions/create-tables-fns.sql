\c labbyRewriteDB;

DROP TABLE IF EXISTS labby_tasks;
DROP TABLE IF EXISTS labby_users;

SELECT createUsers();
SELECT createTasks();