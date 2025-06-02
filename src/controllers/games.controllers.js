import { db } from "../database/db.connection.js"

export async function getGames(req, res) {
    try {
        const games = await db.query(`SELECT * FROM games`);
        res.send(games.rows)

    } catch (err) {

        res.status(500).send("err.message")

    }
}

export async function inserirGames(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body;
    try {

        const existingGame = await db.query('SELECT * FROM games WHERE name = $1', [name]);
        if (existingGame.rows.length > 0) {
            return res.status(409).send("Jogo já cadastrado");
        }
        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`, [name, image, stockTotal, pricePerDay]);
        res.sendStatus(201);

        if (!name || !image || !stockTotal || !pricePerDay) {
            return res.status(400).send("Todos os campos são obrigatórios");
        }

        if (stockTotal < 0 || pricePerDay < 0) {
            return res.status(400).send("Valores inválidos para estoque ou preço");
        }

    } catch (err) {

        res.status(500).send(err.message)

    }
}