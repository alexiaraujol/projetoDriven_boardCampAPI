import { db } from "../database/db.connection.js";


export async function getRentalsRepository() {
    const rentalsResult = await db.query(`SELECT * FROM rentals`);
    const rentals = rentalsResult.rows;

    return rentals;
}
export async function getRentalsRepositoryById(id) {
    const rentalResult = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
    return rentalResult.rows[0];
}

export async function inserirRentalRepository(customerId, gameId, rentDate, daysRented, originalPrice) {
    const result = await db.query(
        `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [customerId, gameId, rentDate, daysRented, null, originalPrice, null]
    );
    return result.rows[0];
}

export async function finalizarRentalsRepository(id) {
    const result = await db.query(
        `UPDATE rentals SET "returnDate" = $1 WHERE id = $2 RETURNING *`,
        [new Date(), id]
    );
    return result.rows[0];
}

export async function deleteRentalsRepository(id) {
    const result = await db.query(`DELETE FROM rentals WHERE id = $1`, [id]);
    return result.rowCount > 0; // Retorna true se a exclusão foi bem-sucedida
    
}
