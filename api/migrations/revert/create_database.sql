-- Revert totum:create_database from pg

BEGIN;

DROP TABLE user_activity;
DROP TABLE category CASCADE;
DROP TABLE meta CASCADE;
DROP TABLE comment;
DROP TABLE activity;
DROP TABLE users;
-- DROP DOMAIN text_plus;
-- DROP DOMAIN email;
DROP DOMAIN zip_code;

COMMIT;
