import { getGamesService, inserirGamesService } from "../services/games.services.js";

export async function getGames(req, res) {
    try {
        const resultado = await getGamesService();
        res.send(resultado)

    } catch (err) {

        res.status(500).send(err.message)

    }
}

export async function inserirGames(req, res) {
    try {

        const resultado = await inserirGamesService(req.body);

        if(resultado === null){
            return res.status(400).send("Ocorreu um erro");
        }

        res.status(201).send(resultado);

        // if (!name || !image || !stockTotal || !pricePerDay) {
        //     return res.status(400).send("Todos os campos são obrigatórios");
        // }

        // if (stockTotal < 0 || pricePerDay < 0) {
        //     return res.status(400).send("Valores inválidos para estoque ou preço");
        // }
        // const existingGame = await db.query('SELECT * FROM games WHERE name = $1', [name]);
        // if (existingGame.rows.length > 0) {
        //     return res.status(409).send("Jogo já cadastrado");
        // }
        // await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`, [name, image, stockTotal, pricePerDay]);
        // res.sendStatus(201);


    } catch (err) {

        res.status(500).send(err.message)

    }
}