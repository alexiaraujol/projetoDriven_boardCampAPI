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

    function formatDate(date) {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    }

    try {

        const rentalResult = await db.query('SELECT * FROM rentals WHERE id = $1', [id]);
        if (rentalResult.rows.length === 0) {
            return res.status(404).send("Aluguel não encontrado");
        }
        const rental = rentalResult.rows[0];

        if (rental.returnDate) {
            return res.status(422).send("Aluguel já finalizado");
        }


        const returnDate = formatDate(new Date());
        const rentDate = new Date(rental.rentDate);
        const daysRented = rental.daysRented;


        const dueDate = new Date(rentDate);
        dueDate.setDate(dueDate.getDate() + daysRented);


        let delayDays = Math.floor((returnDate - dueDate) / (1000 * 60 * 60 * 24));
        delayDays = delayDays > 0 ? delayDays : 0;


        const gameResult = await db.query('SELECT "pricePerDay" FROM games WHERE id = $1', [rental.gameId]);
        const pricePerDay = gameResult.rows[0].pricePerDay;


        const delayFee = delayDays * pricePerDay;


        await db.query(
            `UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`,
            [returnDate, delayFee, id]
        );

        res.sendStatus(200);

    } catch (err) {
        res.status(500).send(err.message);
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


