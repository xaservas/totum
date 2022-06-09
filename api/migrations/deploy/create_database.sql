-- Deploy totum:create_database to pg

BEGIN;

-- create personnal domain
CREATE DOMAIN zip_code AS TEXT CHECK (VALUE ~ '^[0-9]{5}$');
CREATE DOMAIN email AS TEXT CHECK (VALUE ~ '^[a-zA-ZÀ-ÿ0-9-_.]{0,}@[a-zA-ZÀ-ÿ0-9_.]{0,}.[a-zA-ZÀ-ÿ]$');
CREATE DOMAIN text_plus AS TEXT CHECK (VALUE ~ '^[a-zA-ZÀ-ÿ]$');

CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email email NOT NULL UNIQUE,
    password TEXT NOT NULL,
    firstname text_plus NOT NULL,
    lastname text_plus NOT NULL,
    picture TEXT,
    about text_plus,
    address text_plus,
    zip_code zip_code NOT NULL,
    city text_plus NOT NULL,
    country text_plus NOT NULL,
    meta_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE activity (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text_plus NOT NULL,
    level text_plus NOT NULL,
    address text_plus NOT NULL,
    zip_code zip_code NOT NULL,
    city text_plus NOT NULL,
    country text_plus NOT NULL,
    landmark TEXT NOT NULL,
    id_user INT NOT NULL REFERENCES users(id),
    id_category INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE comment (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content text_plus NOT NULL,
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
    id_user INT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE category (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text_plus NOT NULL,
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

ALTER TABLE activity
ADD CONSTRAINT id_category FOREIGN KEY (id_category) REFERENCES category(id);




COMMIT;
