import { getCustomersByCpfRepository, getCustomersByIdRepository, getCustomersRepository, inserirCustomersRepository } from "../repositories/customers.repositorie.js";


export async function getCustomersServices() {

    const customers = await getCustomersRepository();
    return customers
}

export async function getCustomersByIdServices(id) {

    const customer = await getCustomersByIdRepository(id);
    return customer;

}


export async function inserirCustomersServices(name, phone, cpf) {
     console.log('CPF recebido:', cpf); // Adicione esta linha
    // Validação do CPF: deve ter 11 dígitos numéricos
    if (!cpf || cpf.replace(/\D/g, '').length !== 11) throw {
        type: "bad_request",
        message: "CPF inválido, deve ter 11 dígitos"
    };

    // Verifica se o CPF já existe no banco
    const existingCpfResult = await getCustomersByCpfRepository(cpf);
    const existingCpf = existingCpfResult.rows || [];

    if (existingCpf.length > 0) throw {
        type: "conflict",
        message: "CPF já cadastrado"
    };

    // Validação do telefone
    if (!phone || phone.length < 10 || phone.length > 11) throw {
        type: "bad_request",
        message: "Telefone inválido, deve ter entre 10 e 11 dígitos"
    };

    // Validação do nome
    if (!name || name.trim() === "") throw {
        type: "bad_request",
        message: "Nome inválido"
    };

    await inserirCustomersRepository(name, phone, cpf);

    return {
        name,
        phone,
        cpf
    };
}