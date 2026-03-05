import pool from "../Config/DataBase.js";
import { generateSlug } from "../Utils/slug.js";

const buildMovieQuery = ({ genre, country, type }) => {
  const where = [];
  const params = [];
  let index = 1;

  if (country) {
    where.push(`LOWER(m.country) = LOWER($${index++})`);
    params.push(country);
  }

  if (type) {
    where.push(`LOWER(m.type::text) = LOWER($${index++})`);
    params.push(type);
  }

  if (genre) {
    where.push(
      `EXISTS (
        SELECT 1
        FROM movie_genres mg
        JOIN genres g ON g.id = mg.genre_id
        WHERE mg.movie_id = m.id
          AND LOWER(g.name) = LOWER($${index++})
      )`,
    );
    params.push(genre);
  }

  const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const query = `
    SELECT
      m.id,
      m.name,
      m.description,
      m.slug,
      m.country,
      m.poster,
      m.backdoor,
      m.release_date,
      m.type,
      COALESCE((
        SELECT json_agg(
          json_build_object("id", g.id, "name", g.name)
          ORDER BY g.name
        )
        FROM movie_genres mg
        JOIN genres g ON g.id = mg.genre_id
        WHERE mg.movie_id = m.id
      ), '[]'::json) AS genres,
      COALESCE((
        SELECT json_agg(
          json_build_object(
            "episode_number", e.episode_number,
            "title", e.title,
            "video_url", e.video_url
          )
          ORDER BY e.episode_number
        )
        FROM episodes e
        WHERE e.movie_id = m.id
      ), '[]'::json) AS episodes
    FROM movies m
    ${whereClause}
    ORDER BY m.id DESC
  `;

  return { query, params };
};

const getMovies = async (filters = {}) => {
  const { query, params } = buildMovieQuery(filters);
  const result = await pool.query(query, params);
  return result.rows;
};

export const GetAllMovies = async (_req, res) => {
  try {
    const movies = await getMovies();
    res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

export const GetMoviesByGenre = async (req, res) => {
  try {
    const movies = await getMovies({ genre: req.params.genre });
    res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

export const GetMoviesByCountry = async (req, res) => {
  try {
    const movies = await getMovies({ country: req.params.country });
    res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

export const GetSingleMovies = async (_req, res) => {
  try {
    const movies = await getMovies({ type: "single" });
    res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

export const GetSeriesMovies = async (_req, res) => {
  try {
    const movies = await getMovies({ type: "series" });
    res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

export const GetTvShowMovies = async (_req, res) => {
  try {
    const movies = await getMovies({ type: "tvshow" });
    res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

export const GetCinemaMovies = async (_req, res) => {
  try {
    const movies = await getMovies({ type: "movie" });
    res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

export const PostMovie = async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const {
      name,
      description,
      country,
      poster,
      backdoor,
      release_date,
      type,
      genres,
      episodes,
    } = req.body;

    const slug = generateSlug(name);

    await client.query("BEGIN");

    const movieResult = await client.query(
      `INSERT INTO movies 
      (name, description, slug, country, poster,backdoor, release_date, type)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING id`,
      [name, description, slug, country, poster, backdoor, release_date, type],
    );

    const movieId = movieResult.rows[0].id;

    if (genres?.length) {
      for (const genre of genres) {
        let genreId = genre;

        // Support both numeric genre ids and genre names from the UI.
        if (typeof genre === "string" && Number.isNaN(Number(genre))) {
          const genreResult = await client.query(
            `SELECT id FROM genres WHERE LOWER(name) = LOWER($1) LIMIT 1`,
            [genre],
          );

          if (!genreResult.rowCount) {
            throw new Error(`Genre not found: ${genre}`);
          }

          genreId = genreResult.rows[0].id;
        }

        await client.query(
          `INSERT INTO movie_genres (movie_id, genre_id)
           VALUES ($1,$2)`,
          [movieId, genreId],
        );
      }
    }

    if (episodes?.length) {
      for (let ep of episodes) {
        await client.query(
          `INSERT INTO episodes 
          (movie_id, episode_number, title, video_url)
          VALUES ($1,$2,$3,$4)`,
          [movieId, ep.episode_number, ep.title, ep.video_url],
        );
      }
    }

    await client.query("COMMIT");

    res.status(201).json({
      message: "Movie created successfully",
      movie_id: movieId,
    });
  } catch (err) {
    if (client) {
      await client.query("ROLLBACK");
    }
    console.error(err);
    res.status(500).json({ error: err.message || "Server error" });
  } finally {
    if (client) {
      client.release();
    }
  }
};
