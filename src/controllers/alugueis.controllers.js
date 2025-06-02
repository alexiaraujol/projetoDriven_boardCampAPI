import { db } from "../database/db.connection.js"

export async function getAlugueis(req, res){
    try {
        res.send("to aqui porra")

    } catch (err) {

        res.status(500).send("err.message")
        
    }
}
export async function inserirAluguel(req, res){
    try {
        res.send("foi inserido")

    } catch (err) {

        res.status(500).send("err.message")
        
    }
}

export async function finalizarAluguel(req, res){
    try {
        res.send("foi finalizadooo")

    } catch (err) {

        res.status(500).send("err.message")
        
    }
}

export async function apagarAluguel(req, res){
    try {
        res.send("apaguei ")

    } catch (err) {

        res.status(500).send("err.message")
        
    }
}


