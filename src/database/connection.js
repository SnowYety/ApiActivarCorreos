import sql from 'mssql';
import config from '../config';

//Creamos nuestra configuracion para acceder a la base de datos 
const dbConfig = {
    user:config.userDb,
    password:config.passwordDb,
    server:config.serverDb,
    database:config.dataBase,
    options:{
        encrypt: true,
        trustServerCertificate: true
    }
};

//Creamos nuestra configuracion para acceder a la base de datos de pruebas
const dbConfigPruebas = {
    user:config.userDb,
    password:config.passwordDb,
    server:config.serverDb,
    database:config.dataBasePruebas,
    options:{
        encrypt: true,
        trustServerCertificate: true
    }
};

//Creamos la funcion para establecer la conexion a la base de Datos
export async function getConnection(){

    try {
        const pool = await sql.connect(dbConfig);
        return pool;
        
    } catch (error) {
        console.error(error);
    }

}

//Creamos la funcion para establecer la conexion a la base de Datos de Pruebas
export async function getConnectionPruebas(){

    try {
        const pool = await sql.connect(dbConfigPruebas);
        return pool;
        
    } catch (error) {
        console.error(error);
    }

}


//Exportamos el modulo de sql para no importarlo de nuevo 
export {sql};