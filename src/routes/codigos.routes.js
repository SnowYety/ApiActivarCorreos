import {Router} from 'express';
import { getAniosActivos, getFechaLimite, getPeriodosActivos, getSessionActivas, updateFechaLimite } from '../controllers/codigos.controllers';
import { verificarToken } from '../middlewares/authJwt';

//Inicializamo Router para poder usarlo
const router=Router();

router.get('/apiUcq/aniosActivos',getAniosActivos);
router.get('/apiUcq/periodosActivos/:anio',getPeriodosActivos);
router.get('/apiUcq/sessionActivas/:anio/:periodo',getSessionActivas);
router.get('/apiUcq/getFecha',getFechaLimite);
router.put('/apiUcq/updateFecha',verificarToken,updateFechaLimite);

export default router;