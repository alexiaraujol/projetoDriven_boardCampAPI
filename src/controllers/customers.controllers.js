import { getCustomersByIdServices, getCustomersServices, inserirCustomersServices } from "../services/customers.services.js";


export async function getCustomers(req, res) {
    try {
        const resultado = await getCustomersServices()
        res.send(resultado.rows)

    } catch (err) {

        res.status(500).send("err.message")

    }
}

export async function getCustomersById(req, res) {

    const { id } = req.params;
    try {
        const resultado = await getCustomersByIdServices(id)
        res.send(resultado)


    } catch (err) {

        res.status(500).send(err.message)

    }
}

export async function inserirCustomers(req, res) {

     
    try {

        const resultado = await inserirCustomersServices(req.body)

        if(resultado === null){
            return res.status(400).send("Ocorreu um erro");
        }
        
        res.sendStatus(201);
        // const existingCpf = await db.query('SELECT * FROM customers WHERE cpf = $1', [cpf]);
        // if (existingCpf.rows.length > 0) {
        //     return res.status(409).send("Cpf já cadastrado");
        // }

        // if (cpf.length !== 11 || cpf === "") {
        //     return res.status(400).send("Cpf inválido");
        // }

        // if (phone.length < 10 || phone.length > 11 || phone === "") {
        //     return res.status(400).send("Telefone inválido");
        // }
        
        // if (!name || name === "") {
        //     return res.status(400).send("Nome inválido");
        // }


        // await db.query(`INSERT INTO customers (name, phone, cpf) VALUES ($1, $2, $3)`, [name, phone, cpf]);


    } catch (err) {

        res.status(500).send(err.message)

    }
}
