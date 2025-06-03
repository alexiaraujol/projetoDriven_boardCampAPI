import { db } from "../database/db.connection.js";

export async function getCustomersRepository() {

    const resultado = await db.query(`SELECT * FROM customers`);
    return resultado.rows;

}


export async function inserirCustomersRepository(name, phone, cpf) {

    const resultado = await db.query(`INSERT INTO customers (name, phone, cpf) VALUES ($1, $2, $3) RETURNING *`, [name, phone, cpf]);
    return resultado;



}

export async function getCustomersByCpfRepository(cpf) {

    const resultado = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf]);
    return resultado.rows;

}

export async function getCustomersByIdRepository(id) {
    const resultado = await db.query(`SELECT * FROM customers WHERE id = $1`, [id]);
    return resultado.rows;
}