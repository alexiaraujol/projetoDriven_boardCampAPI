import { getCustomersByIdServices, getCustomersServices, inserirCustomersServices } from "../services/customers.services.js";


export async function getCustomers(req, res) {
    try {
        const resultado = await getCustomersServices()
        res.send(resultado)

    } catch (err) {


        res.status(500).send(err.message)

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

        const { name, phone, cpf } = req.body;
        const resultado = await inserirCustomersServices(name, phone, cpf);
        res.status(201).send(resultado);

    } catch (err) {

        if (err.type === "bad_request") {
            return res.status(400).send(err.message);
        }
        res.status(500).send(err.message)

    }
}
