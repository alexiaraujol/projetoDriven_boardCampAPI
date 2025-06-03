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

        const resultado = await inserirRentalServices(customerId, gameId, daysRented);
        res.status(201).send(resultado);
    } catch (err) {

        if (err.type === "bad_request") {
            return res.status(400).send(err.message);
        }
        if (err.type === "conflict") {
            return res.status(409).send(err.message);
        }

        res.status(500).send(err.message);
    }
}


export async function finalizarRentals(req, res) {
    const { id } = req.params;

    try {

        const resultado = await finalizarRentalsServices(id);
        res.status(200).send(resultado);


    } catch (err) {

        if (err.type === "bad_request") {
            return res.status(400).send(err.message);
        }
        if (err.type === "conflict") {
            return res.status(409).send(err.message);
        }

        res.status(500).send(err.message);
    }
}


export async function apagarRental(req, res) {
    const { id } = req.params;
    try {

        await deleteRentalsServices(id);
        res.status(204).send("Aluguel deletado com sucesso");

    } catch (err) {
       
        if (err.type === "not_found") {
            return res.status(404).send(err.message);
        }
        if (err.type === "bad_request") {
            return res.status(400).send(err.message);
        }

        res.status(500).send(err.message)

    }
}


