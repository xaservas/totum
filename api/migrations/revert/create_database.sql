-- Revert totum:create_database from pg

BEGIN;

DROP TABLE token_blacklist;
DROP TABLE user_activity;
DROP TABLE meta CASCADE;
DROP TABLE comment;
DROP TABLE activity;
DROP TABLE category CASCADE;
DROP TABLE level CASCADE;
DROP TABLE users;
DROP DOMAIN email;
DROP DOMAIN zip_code;

COMMIT;
