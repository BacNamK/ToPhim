import pool from "../Config/DataBase.js";
import { generateSlug } from "../Utils/slug.js";

const parseJsonField = (value, fallback) => {
  if (value === undefined || value === null || value === "") return fallback;
  if (Array.isArray(value) || typeof value === "object") return value;

  try {
    return JSON.parse(value);
  } catch (_err) {
    return fallback;
  }
};

const buildFileUrl = (req, file) => {
  if (!file?.filename) return "";
  return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
};

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
          json_build_object('id', g.id, 'name', g.name)
          ORDER BY g.name
        )
        FROM movie_genres mg
        JOIN genres g ON g.id = mg.genre_id
        WHERE mg.movie_id = m.id
      ), '[]'::json) AS genres,
      COALESCE((
        SELECT json_agg(
          json_build_object(
            'episode_number', e.episode_number,
            'title', e.title,
            'video_url', e.video_url
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
    const genreParam = (req.params.genre || "").trim();
    const genreSlug = generateSlug(genreParam);

    if (!genreParam) {
      return res.status(200).json([]);
    }

    const movies = await getMovies();
    const filteredMovies = movies.filter((movie) =>
      Array.isArray(movie.genres)
        ? movie.genres.some((g) => generateSlug(g?.name || "") === genreSlug)
        : false,
    );

    res.status(200).json(filteredMovies);
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
    const files = req.files || {};
    const posterFile = files.poster?.[0];
    const backdoorFile = files.backdoor?.[0];
    const parsedGenres = parseJsonField(req.body.genres, []);
    const parsedEpisodes = parseJsonField(req.body.episodes, []);

    const { name, description, country, release_date, type } = req.body;

    const poster = buildFileUrl(req, posterFile) || req.body.poster || "";
    const backdoor = buildFileUrl(req, backdoorFile) || req.body.backdoor || "";
    const safeName = (name || "").trim();
    const safeCountry = (country || "").trim();
    const safeReleaseDate =
      typeof release_date === "string" && release_date.trim() !== ""
        ? release_date
        : null;
    const safeType = (type || "single").trim() || "single";
    const baseSlug = generateSlug(safeName);

    if (!safeName) {
      throw new Error("Movie name is required");
    }
    if (!baseSlug) {
      throw new Error("Movie slug is invalid");
    }

    await client.query("BEGIN");

    let slug = baseSlug;
    let slugIndex = 1;
    while (true) {
      const slugCheck = await client.query(
        `SELECT 1 FROM movies WHERE slug = $1 LIMIT 1`,
        [slug],
      );
      if (!slugCheck.rowCount) break;
      slug = `${baseSlug}-${slugIndex}`;
      slugIndex += 1;
    }

    const movieResult = await client.query(
      `INSERT INTO movies 
      (name, description, slug, country, poster,backdoor, release_date, type)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING id`,
      [
        safeName,
        description || "",
        slug,
        safeCountry,
        poster,
        backdoor,
        safeReleaseDate,
        safeType,
      ],
    );

    const movieId = movieResult.rows[0].id;

    if (parsedGenres?.length) {
      for (const genre of parsedGenres) {
        let genreId = genre;

        // Support both numeric genre ids and genre names from the UI.
        if (typeof genre === "string" && Number.isNaN(Number(genre))) {
          const safeGenreName = genre.trim();
          if (!safeGenreName) continue;

          const genreResult = await client.query(
            `SELECT id FROM genres WHERE LOWER(name) = LOWER($1) LIMIT 1`,
            [safeGenreName],
          );

          if (genreResult.rowCount) {
            genreId = genreResult.rows[0].id;
          } else {
            const newGenreResult = await client.query(
              `INSERT INTO genres (name) VALUES ($1) RETURNING id`,
              [safeGenreName],
            );
            genreId = newGenreResult.rows[0].id;
          }
        } else if (!Number.isNaN(Number(genre))) {
          genreId = Number(genre);
        }

        await client.query(
          `INSERT INTO movie_genres (movie_id, genre_id)
           VALUES ($1,$2)`,
          [movieId, genreId],
        );
      }
    }

    if (parsedEpisodes?.length) {
      for (let ep of parsedEpisodes) {
        await client.query(
          `INSERT INTO episodes 
          (movie_id, episode_number, title, video_url)
          VALUES ($1,$2,$3,$4)`,
          [
            movieId,
            Number(ep.episode_number) || 1,
            ep.title || "",
            ep.video_url || "",
          ],
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

export const DeleteMovie = async (req, res) => {
  const movieId = Number(req.params.id);

  if (!Number.isInteger(movieId) || movieId <= 0) {
    return res.status(400).json({ error: "Movie id is invalid" });
  }

  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    await client.query(`DELETE FROM episodes WHERE movie_id = $1`, [movieId]);
    await client.query(`DELETE FROM movie_genres WHERE movie_id = $1`, [movieId]);
    const result = await client.query(`DELETE FROM movies WHERE id = $1`, [movieId]);

    if (!result.rowCount) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Movie not found" });
    }

    await client.query("COMMIT");
    return res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    if (client) {
      await client.query("ROLLBACK");
    }
    console.error(err);
    return res.status(500).json({ error: err.message || "Server error" });
  } finally {
    if (client) {
      client.release();
    }
  }
};
