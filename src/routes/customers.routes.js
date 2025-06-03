import { Router } from "express";
import { getCustomers, getCustomersById, inserirCustomers } from "../controllers/customers.controllers.js";
import { customersSchema } from "../schemas/customers.schemas.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";



const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomersById);
customersRouter.post("/customers", validateSchema(customersSchema), inserirCustomers);

export default customersRouter;