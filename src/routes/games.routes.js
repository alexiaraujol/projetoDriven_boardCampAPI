import { Router } from "express";
import { getGames, inserirGames } from "../controllers/games.controllers.js";
import { gamesSchema } from "../schemas/games.schemas.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";



const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games",validateSchema(gamesSchema), inserirGames);

export default gamesRouter;