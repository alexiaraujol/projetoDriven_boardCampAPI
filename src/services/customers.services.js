
import { db } from "../database/db.connection.js";
import { getCustomersByIdRepository, getCustomersRepository } from "../repositories/customers.repositorie.js";


export async function getCustomersServices() {

    const customers = await getCustomersRepository();
    return customers
}

export async function getCustomersByIdServices(id) {

    const customer = await getCustomersByIdRepository(id);
    return customer;

}


export async function inserirCustomersServices(name, phone, cpf) {

    const existingCpf = await getCustomersByCpfRepository(cpf);

    if (existingCpf.length > 0) {
        return null;
    }

    if (cpf.length !== 11 || cpf === "") {
        return null;
    }

    if (phone.length < 10 || phone.length > 11 || phone === "") {
        return null;
    }

    if (!name || name === "") {
        return null;
    }


    await inserirCustomersRepository(name, phone, cpf);

    return {
        name,
        phone,
        cpf
    }

}