import { deleteRentalsServices, finalizarRentalsServices, getRentalsServices, inserirRentalServices } from "../services/rentals.services.js";

export async function getRentals(req, res) {

    function formatDate(date) {
        if (!date) return null;
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    }


    try {

        const resultado = await getRentalsServices(req.body);

        // const rentalsResult = await db.query(`SELECT * FROM rentals`);
        // const rentals = rentalsResult.rows;

        const formattedRentals = resultado.map(rental => ({
            ...rental,
            rentDate: formatDate(rental.rentDate),
            returnDate: formatDate(rental.returnDate)
        }));

        res.send(formattedRentals);

    } catch (err) {
        res.status(500).send(err.message);
    }
}


export async function inserirRental(req, res) {
    let { customerId, gameId, daysRented } = req.body;

    customerId = parseInt(customerId);
    gameId = parseInt(gameId);
    daysRented = parseInt(daysRented);

    if (
        isNaN(customerId) || isNaN(gameId) || isNaN(daysRented) ||
        customerId <= 0 || gameId <= 0 || daysRented <= 0
    ) {
        return res.status(400).send("Dados inválidos");
    }

    try {

        const resultado = await inserirRentalServices();
        if (resultado === null) {
            return res.status(400).send("Ocorreu um erro");
        }

        res.status(201).send(resultado);

        // Verificar se o cliente existe
        // const customerResult = await db.query('SELECT * FROM customers WHERE id = $1', [customerId]);
        // if (customerResult.rows.length === 0) {
        //     return res.status(404).send("Cliente não encontrado");
        // }


        // const gameResult = await db.query('SELECT * FROM games WHERE id = $1', [gameId]);
        // if (gameResult.rows.length === 0) {
        //     return res.status(404).send("Jogo não encontrado");
        // }

        // const game = gameResult.rows[0];


        // const openRentalsResult = await db.query(
        //     `SELECT COUNT(*) FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL`,
        //     [gameId]
        // );
        // const openRentals = parseInt(openRentalsResult.rows[0].count);
        // if (openRentals >= game.stockTotal) {
        //     return res.status(422).send("Não há jogos disponíveis no estoque");
        // }


        // const rentDate = new Date();
        // const originalPrice = daysRented * game.pricePerDay;


        // await db.query(
        //     `INSERT INTO rentals 
        //     ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
        //     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        //     [customerId, gameId, rentDate, daysRented, null, originalPrice, null]
        // );

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}


export async function finalizarRentals(req, res) {
    const { id } = req.params;

    // Corrigido: usando crase e hífen no retorno
    function formatDate(date) {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    }

    try {

        const resultado = await finalizarRentalsServices(id);
        if (resultado === null) {
            return res.status(400).send("Ocorreu um erro");
        }

        res.status(200).send(resultado);

        // const rentalResult = await db.query('SELECT * FROM rentals WHERE id = $1', [id]);
        // if (rentalResult.rows.length === 0) {
        //     return res.status(404).send("Aluguel não encontrado");
        // }

        // const rental = rentalResult.rows[0];

        // if (rental.returnDate) {
        //     return res.status(422).send("Aluguel já finalizado");
        // }

        // const now = new Date(); // usamos para cálculo e para salvar no banco
        // const rentDate = new Date(rental.rentDate);
        // const daysRented = rental.daysRented;

        // const dueDate = new Date(rentDate);
        // dueDate.setDate(dueDate.getDate() + daysRented);

        // let delayDays = Math.floor((now - dueDate) / (1000 * 60 * 60 * 24));
        // delayDays = delayDays > 0 ? delayDays : 0;

        // const gameResult = await db.query('SELECT "pricePerDay" FROM games WHERE id = $1', [rental.gameId]);
        // const pricePerDay = gameResult.rows[0].pricePerDay;

        // const delayFee = delayDays * pricePerDay;

        // // Aqui salvamos no banco normalmente (formato ISO)
        // await db.query(
        //     `UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`,
        //     [now, delayFee, id]
        // );

        // // Enviar resposta com datas formatadas (opcional)
        // const updatedRental = {
        //     ...rental,
        //     returnDate: formatDate(now),
        //     rentDate: formatDate(rental.rentDate),
        //     delayFee
        // };


    } catch (err) {
        res.status(500).send(err.message);
    }
}


export async function apagarRental(req, res) {
    const { id } = req.params;
    try {

        await deleteRentalsServices(id);
        res.sendStatus(204);

    } catch (err) {

        res.status(500).send(err.message)

    }
}


