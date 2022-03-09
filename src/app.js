import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';
import codigosRouter from './routes/codigos.routes';
import alumnosRouter from './routes/alumnos.routes';
import autnRouter from './routes/auth.routes';


//Obtenemos el puerto del archivo de configuracion 
let port = config.port;

//Inicializamos el servicio de Express
const app = express();

//Configuramos el puerto a nuestro Servicio 
app.set('port',port);

//Configuramo express para que utilize el servicio de Morgan para ver las peticiones que nos envia el usuario 
app.use(morgan('dev'));

//Configuramos express para que utilize el modulo de cors y pueda recibir peticiones de otros sistemas
app.use(cors());

//Configuramos express para que pueda resivir datos por el body
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Le indicamos a nuestro servicio las rutas que vas usar 
app.use(codigosRouter);
app.use(alumnosRouter);
app.use(autnRouter);


//Exportamos nuestro servicio para poder ser usado en el index.js de nuestra aplicacion 
export default app;