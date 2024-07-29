CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

INSERT INTO users (name, email) VALUES ('Juan Pérez', 'juan.perez@example.com');
INSERT INTO users (name, email) VALUES ('María López', 'maria.lopez@example.com');
INSERT INTO users (name, email) VALUES ('Carlos García', 'carlos.garcia@example.com');


SELECT * FROM users;