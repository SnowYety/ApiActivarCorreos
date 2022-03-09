import {Router} from 'express';
import { cambiarStatusCorreo, getAlumno, getAlumnos } from '../controllers/alumnos.controllers';
import {verificarToken}from '../middlewares/authJwt'

//Inicializamo Router para poder usarlo
const router=Router();

router.post('/apiUcq/getAlumnos',verificarToken,getAlumnos)
router.get('/apiUcq/getAlumno/:matricula',getAlumno);
router.put('/apiUcq/cambiarStatusCorreo',verificarToken,cambiarStatusCorreo);

export default router;