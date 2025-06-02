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

        const existingCustomer = await db.query('SELECT * FROM customers WHERE name = $1', [name]);
        if (existingCustomer.rows.length > 0) {
            return res.status(409).send("Cliente já cadastrado");
        }

        const existingCpf = await db.query('SELECT * FROM customers WHERE cpf = $1', [cpf]);
        if (existingCpf.rows.length > 0) {
            return res.status(409).send("Cpf já cadastrado");
        }


        await db.query(`INSERT INTO customers (name, phone, cpf) VALUES ($1, $2, $3)`, [name, phone, cpf]);
        res.sendStatus(201);


    } catch (err) {

        res.status(500).send(err.message)

    }
}
