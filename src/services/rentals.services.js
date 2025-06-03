import { db } from "../database/db.connection.js";
import { getCustomersByIdRepository } from "../repositories/customers.repositorie.js";
import { getGameByIdRepository } from "../repositories/games.repositorie.js";
import { deleteRentalsRepository, finalizarRentalsRepository, getRentalsRepository, getRentalsRepositoryById, inserirRentalRepository } from "../repositories/rentals.repositorie.js";


export async function getRentalsServices() {

    const rentalsResult = await getRentalsRepository();
    const rentals = rentalsResult;

    return rentals;

}

export async function inserirRentalServices(customerId, gameId, daysRented) {

    const customerResult = await getCustomersByIdRepository(customerId);

    if (!customerResult || customerResult.length === 0) throw {
        type: "bad_request",
        message: "Cliente não encontrado"
    };

    const gameResult = await getGameByIdRepository(gameId);
    console.log('Resultado do getGameByIdRepository:', gameResult);

    if (!gameResult || gameResult.length === 0) throw {
        type: "bad_request",
        message: "Jogo não encontrado"
    };

    const game = gameResult[0];

    const openRentalsResult = await db.query(
        `SELECT COUNT(*) FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL`,
        [gameId]
    );

    const openRentals = parseInt(openRentalsResult.rows[0].count);
    if (openRentals >= game.stockTotal) throw {
        type: "conflict",
        message: "Jogo não disponível"
    };


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

    function formatDate(date) {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const rentalResult = await getRentalsRepositoryById(id);
    if (rentalResult.length === 0) throw {
        type: "bad_request",
        message: "Aluguel não encontrado"
    };

    const rental = rentalResult[0];

    console.log('Valor de returnDate:', rental.returnDate);
    console.log(rental)
    if (rental.returnDate && rental.returnDate !== null && rental.returnDate !== undefined) {
        throw {
            type: "bad_request",
            message: "Aluguel já finalizado"
        };
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
 
    const rentalResult = await getRentalsRepositoryById(id);
    if (!rentalResult || rentalResult.length === 0) {
        throw {
            type: "not_found",
            message: "Aluguel não encontrado"
        };
    }

    const rental = rentalResult[0];


    if (!rental.returnDate) {
        throw {
            type: "bad_request",
            message: "Aluguel ainda não finalizado"
        };
    }

    await deleteRentalsRepository(id);
}

