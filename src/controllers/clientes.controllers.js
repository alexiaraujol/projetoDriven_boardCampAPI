import { db } from "../database/db.connection.js"

export async function getClientes(req, res) {
    try {
        const customers = await db.query(`SELECT * FROM customers`);
        res.send(customers.rows)

    } catch (err) {

        res.status(500).send("err.message")

    }
}

export async function getClientesById(req, res) {

    const { id } = req.params;
    try {
        const custumer = await db.query(`SELECT * FROM customers WHERE id = $1`, [id]);
        res.send(custumer.rows[0])


    } catch (err) {

        res.status(500).send("err.message")

    }
}

export async function inserirClientes(req, res) {

     const {name, phone, cpf} = req.body;
    try {
        await db.query(`INSERT INTO customers (name, phone, cpf) VALUES ($1, $2, $3)`, [name, phone, cpf]);
        res.sendStatus(201);


    } catch (err) {

        res.status(500).send(err.message)

    }
}
