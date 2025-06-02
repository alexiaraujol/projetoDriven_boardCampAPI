import { db } from "../database/db.connection.js"

export async function getAlugueis(req, res) {
    try {
        const rentals = await db.query(`SELECT * FROM rentals`);
        res.send(rentals.rows)

    } catch (err) {

        res.status(500).send("err.message")

    }
}
export async function inserirAluguel(req, res) {
    let { customerId, gameId, daysRented } = req.body;
    customerId = parseInt(customerId);
    gameId = parseInt(gameId);
    daysRented = parseInt(daysRented);

    if (isNaN(customerId) || isNaN(gameId) || isNaN(daysRented)) {
        return res.status(400).send("Campos inválidos");
    }

    try {
        const gameResult = await db.query('SELECT "pricePerDay" FROM games WHERE id = $1', [gameId]);
        if (gameResult.rows.length === 0) {
            return res.status(400).send("Jogo não encontrado");
        }
        const pricePerDay = gameResult.rows[0].pricePerDay;

        const rentDate = new Date();
        const originalPrice = pricePerDay * daysRented;
        await db.query(
            `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice") VALUES ($1, $2, $3, $4, $5)`,
            [customerId, gameId, rentDate, daysRented, originalPrice]
        );
        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function finalizarAluguel(req, res) {
    const { id } = req.params;
    const { returnDate, delayFee } = req.body;
    try {
        await db.query(`
            UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 
            WHERE id = $3`
            , [returnDate, delayFee, id]);
        res.sendStatus(200);

    } catch (err) {

        res.status(500).send("err.message")

    }
}

export async function apagarAluguel(req, res) {
    const { id } = req.params;
    try {
        await db.query(`DELETE FROM rentals WHERE id = $1`, [id]);
        res.sendStatus(204);

    } catch (err) {

        res.status(500).send("err.message")

    }
}


