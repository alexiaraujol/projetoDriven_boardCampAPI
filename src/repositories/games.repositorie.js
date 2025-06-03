import { db } from "../database/db.connection.js";

export async function getGamesRepository(){

    const resultado = await db.query(`SELECT * FROM games`);
    return resultado.rows;
}

export async function getGameByIdRepository(id) {
    const resultado = await db.query(`SELECT * FROM games WHERE id = $1`, [id]);
    return resultado.rows[0];
}

export async function getGameByNameRepository(name) {
    const resultado = await db.query(`SELECT * FROM games WHERE name = $1`, [name]);
    return resultado.rows[0];
}

export async function inserirGamesRepository(name, image, stockTotal, pricePerDay) {
    await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`, [name, image, stockTotal, pricePerDay]);
}