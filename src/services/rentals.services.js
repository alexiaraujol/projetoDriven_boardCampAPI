import { db } from "../database/db.connection.js";
import { getCustomersByIdRepository } from "../repositories/customers.repositorie.js";
import { finalizarRentalsRepository, getRentalsRepository } from "../repositories/rentals.repositorie.js";


export async function getRentalsServices() {

    const rentalsResult = await getRentalsRepository();
    const rentals = rentalsResult;

    return rentals;

}

export async function inserirRentalServices(customerId, gameId, daysRented) {

    const customerResult = await getCustomersByIdRepository(customerId);
    if (!customerResult || customerResult.rows.length === 0) {
        return null;
    }


    const gameResult = await getGameByIdRepository(gameId);

    if (gameResult.rows.length === 0) {
        return null;
    }

    const game = gameResult.rows[0];


    const openRentalsResult = await db.query(
        `SELECT COUNT(*) FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL`,
        [gameId]
    );
    const openRentals = parseInt(openRentalsResult.rows[0].count);
    if (openRentals >= game.stockTotal) {
        return null;
    }


    const rentDate = new Date();
    const originalPrice = daysRented * game.pricePerDay;


    await inserirRentalRepository(customerId, gameId, rentDate, daysRented, originalPrice);

    return {
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate: null,
        originalPrice,
        delayFee: null
    };
}

export async function finalizarRentalsServices(id) {

    const rentalResult = await getRentalsRepositoryById(id);
    if (rentalResult.rows.length === 0) {
        return null;
    }

    const rental = rentalResult.rows[0];

    if (rental.returnDate) {
        return null;
    }

    const now = new Date(); // usamos para cálculo e para salvar no banco
    const rentDate = new Date(rental.rentDate);
    const daysRented = rental.daysRented;

    const dueDate = new Date(rentDate);
    dueDate.setDate(dueDate.getDate() + daysRented);

    let delayDays = Math.floor((now - dueDate) / (1000 * 60 * 60 * 24));
    delayDays = delayDays > 0 ? delayDays : 0;

    const gameResult = await db.query('SELECT "pricePerDay" FROM games WHERE id = $1', [rental.gameId]);
    const pricePerDay = gameResult.rows[0].pricePerDay;

    const delayFee = delayDays * pricePerDay;

    // Aqui salvamos no banco normalmente (formato ISO)
    await finalizarRentalsRepository(id);

    // Enviar resposta com datas formatadas (opcional)
    const updatedRental = {
        ...rental,
        returnDate: formatDate(now),
        rentDate: formatDate(rental.rentDate),
        delayFee
    };

    return updatedRental;


}

export async function deleteRentalsServices(id) {


    if (returnDate === null) {
            return res.status(400).send("Aluguel ainda não finalizado");
        }

        await deleteRentalsRepository(id);

   

}

