-- Deploy totum:create_database to pg

BEGIN;

-- create personnal domain
CREATE DOMAIN zip_code AS TEXT CHECK (VALUE ~ '^[0-9]{5}$');
-- CREATE DOMAIN email AS TEXT CHECK (VALUE ~ '^[a-zA-ZÀ-ÿ0-9_.-]{0,}@[a-zA-ZÀ-ÿ0-9_.-]{0,}.[a-zA-ZÀ-ÿ]$');
-- CREATE DOMAIN text_plus AS TEXT CHECK (VALUE ~ '^[a-zA-ZÀ-ÿ]{0,}$');

CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    picture TEXT,
    about TEXT,
    address TEXT,
    zip_code zip_code NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE activity (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    level TEXT NOT NULL,
    address TEXT NOT NULL,
    zip_code zip_code NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    landmark TEXT,
    id_user INT NOT NULL REFERENCES users(id),
    id_category INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE comment (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content TEXT NOT NULL,
    picture TEXT,
    id_user INT NOT NULL REFERENCES users(id),
    id_activity INT NOT NULL REFERENCES activity(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE meta (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cookie BOOLEAN NOT NULL DEFAULT FALSE,
    landmark BOOLEAN NOT NULL DEFAULT FALSE,
    id_user INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE category (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    picto TEXT,
    id_user INT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE user_activity (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_user INT NOT NULL REFERENCES users(id),
    id_activity INT NOT NULL REFERENCES activity(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

ALTER TABLE users
ADD COLUMN meta_id INT REFERENCES meta(id);

COMMIT;
