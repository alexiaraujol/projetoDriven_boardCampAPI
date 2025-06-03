import { getGameByNameRepository, getGamesRepository, inserirGamesRepository } from "../repositories/games.repositorie.js";

export async function getGamesService() {
    const gamesResult = await getGamesRepository()
    return gamesResult;
}


export async function inserirGamesService(name, image, stockTotal, pricePerDay) {

    if (!name || !image || stockTotal == null || pricePerDay == null) throw {
        type: "bad_request",
        message: "Todos os campos são obrigatórios"
    };
    if (stockTotal < 1 || pricePerDay < 1) throw {
        type: "bad_request",
        message: "Valores inválidos para estoque ou preço"
    };

    const existingGame = await getGameByNameRepository(name);
    if (existingGame.length > 0) throw {
        type: "conflict",
        message: "Jogo já cadastrado"
    };

    const novoJogo = await inserirGamesRepository(name, image, stockTotal, pricePerDay);
    return novoJogo;
}