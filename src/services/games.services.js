import { getGameByNameRepository, getGamesRepository, inserirGamesRepository } from "../repositories/games.repositorie.js";

export async function getGamesService() {
    const gamesResult = await getGamesRepository()
    return gamesResult;
}


export async function inserirGamesService(name, image, stockTotal, pricePerDay) {
    if (!name || !image || stockTotal == null || pricePerDay == null) return null;

    if (stockTotal < 1 || pricePerDay < 1) return null;

    const existingGame = await getGameByNameRepository(name);

    if (existingGame.length > 0) return null;

    await inserirGamesRepository(name, image, stockTotal, pricePerDay);

    return {
        name,
        image,
        stockTotal,
        pricePerDay
    };
}