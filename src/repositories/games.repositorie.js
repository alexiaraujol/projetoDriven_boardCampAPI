import { db } from "../database/db.connection.js";

export async function getGamesRepository(){

    const resultado = await db.query(`SELECT * FROM games`);
    console.log(resultado.rows);
    return resultado.rows;
}

export async function getGameByIdRepository(id) {
    const resultado = await db.query(`SELECT * FROM games WHERE id = $1`, [id]);
    return resultado.rows;
}

export async function getGameByNameRepository(name) {
    const resultado = await db.query(`SELECT * FROM games WHERE name = $1`, [name]);
    return resultado.rows;
}

export async function inserirGamesRepository(name, image, stockTotal, pricePerDay) {
   const resultado = await db.query(
     `INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4) RETURNING *`,
     [name, image, stockTotal, pricePerDay]
   );
   const game = resultado.rows[0];
   console.log(game);
   return game;
}