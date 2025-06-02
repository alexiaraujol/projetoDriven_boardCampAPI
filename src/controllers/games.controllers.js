import { db } from "../database/db.connection.js"

export async function getGames(req, res){
    try {
         res.send("to aqui porra")

    } catch (err) {

        res.status(500).send("err.message")
        
    }
}

export async function inserirGames(req, res){
   try {
        res.send("jogo inserido")


    } catch (err) {

        res.status(500).send("err.message")
        
    }
}