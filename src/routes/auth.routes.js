import {Router} from 'express';
import { signIn } from '../controllers/auth.controllers';


//Inicializamo Router para poder usarlo
const router=Router();

router.post('/apiUcq/singIn',signIn);

export default router;