-- Verify totum:create_database on pg

BEGIN;

SELECT * FROM users;
SELECT * FROM level;
SELECT * FROM category;
SELECT * FROM activity;
SELECT * FROM comment;
SELECT * FROM meta;
SELECT * FROM user_activity;
SELECT * FROM token_blacklist;

ROLLBACK;
