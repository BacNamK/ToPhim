import pool from "../Config/DataBase.js";
import { generateSlug } from "../Utils/slug.js";

export const PostMovie = async (req, res) => {
  const client = await pool.connect();

  try {
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
      for (let genreId of genres) {
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
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: "Server error" });
  } finally {
    client.release();
  }
};
