import { Router } from "express";
import { apagarAluguel, finalizarAluguel, getAlugueis, inserirAluguel } from "../controllers/alugueis.controllers.js";
import { alugueisSchema } from "../schemas/alugueis.schemas.js";
import { validateSchema } from "../middleware/validateSchema.middleware.js";


const alugueisRouter = Router();

alugueisRouter.get("/rentals",getAlugueis);
alugueisRouter.post("/rentals",validateSchema(alugueisSchema),inserirAluguel);
alugueisRouter.put("/rentals/:id",validateSchema(alugueisSchema),finalizarAluguel);
alugueisRouter.delete("/rentals/:id",apagarAluguel);




export default alugueisRouter;