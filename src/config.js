//Exportamos el modulo config de el paquete dotenv
import {config} from 'dotenv';


//Activamos la configuracion de las variables de entorno 
config();


//Exportamos la variables de Entorno para poder usarlas en la aplicacion 
export default{
    port:process.env.PORT || 4001,
    userDb:process.env.USERDB,
    passwordDb:process.env.PASSWORDDB,
    serverDb:process.env.SERVERDB,
    dataBase:process.env.DATABASE,
    dataBasePruebas:process.env.DATABASEPRUEBAS,
    secret:process.env.SECRET
}