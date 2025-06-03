import { getGamesService, inserirGamesService } from "../services/games.services.js";

export async function getGames(req, res) {
    try {
        const resultado = await getGamesService();
        res.send(resultado)

    } catch (err) {

        res.status(500).send(err.message)

    }
}

export async function inserirGames(req, res) {
    try {
        const { name, image, stockTotal, pricePerDay } = req.body;
        const resultado = await inserirGamesService(name, image, stockTotal, pricePerDay);
        res.status(201).send(resultado);

    } catch (err) {

        if (err.type === "bad_request" ) {
            return res.status(400).send(err.message);
        }
        if (err.type === "conflict") {
            return res.status(409).send(err.message);

        }
        res.status(500).send(err.message);
    }
}



  
