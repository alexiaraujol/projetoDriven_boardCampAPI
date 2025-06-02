import { Router } from "express";
import { getClientes, getClientesById, inserirClientes } from "../controllers/clientes.controllers.js";
import { validateSchema } from "../middleware/validateSchema.middleware.js";
import { clientesSchema } from "../schemas/clientes.schemas.js";



const clientesRouter = Router();

clientesRouter.get("/customers", getClientes);
clientesRouter.get("/customers/:id", getClientesById);
clientesRouter.post("/customers", validateSchema(clientesSchema), inserirClientes);

export default clientesRouter;