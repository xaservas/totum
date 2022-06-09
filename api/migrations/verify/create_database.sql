-- Verify totum:create_database on pg

BEGIN;

SELECT * FROM users;
SELECT * FROM activity;
SELECT * FROM comment;
SELECT * FROM meta;
SELECT * FROM category;
SELECT * FROM user_activity;

ROLLBACK;
