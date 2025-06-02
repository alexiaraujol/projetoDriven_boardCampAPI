import  { Router } from 'express';
import gamesRouter from './games.routes.js';
import clientesRouter from './clientes.routes.js';
import alugueisRouter from './alugueis.routes.js';


const router = Router();
router.use(alugueisRouter);
router.use(clientesRouter);
router.use(gamesRouter);
export default router;