import { Router } from "express";
import { apagarRental, finalizarRentals, getRentals, inserirRental } from "../controllers/rentals.controllers.js";
import { rentalsSchema } from "../schemas/rentals.schemas.js";
import { validateSchema } from "../middleware/validateSchema.middleware.js";


const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateSchema(rentalsSchema), inserirRental);
rentalsRouter.put("/rentals/:id/return", validateSchema(rentalsSchema), finalizarRentals);
rentalsRouter.delete("/rentals/:id", apagarRental);


export default rentalsRouter;