CREATE TYPE movie_type AS ENUM ('single', 'series','tvshow','movie');
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    isadmin BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movies (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    country VARCHAR(100),
    poster TEXT,
    backdoor TEXT,
    release_date DATE,
    type movie_type NOT NULL DEFAULT 'single',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE episodes (
    id BIGSERIAL PRIMARY KEY,
    movie_id BIGINT NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
    episode_number INTEGER NOT NULL,
    title VARCHAR(255),
    video_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (movie_id, episode_number)
);

CREATE TABLE genres (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE movie_genres (
    movie_id BIGINT NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
    genre_id BIGINT NOT NULL REFERENCES genres(id) ON DELETE CASCADE,
    PRIMARY KEY (movie_id, genre_id)
);

CREATE TABLE comments (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    movie_id BIGINT NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ratings (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    movie_id BIGINT NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
    star SMALLINT NOT NULL CHECK (star BETWEEN 1 AND 5),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, movie_id)
);

UPDATE users
SET isadmin = true
WHERE id = 1;