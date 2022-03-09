import { getConnection, getConnectionPruebas, querys, sql } from "../database";

export const getAniosActivos = async (req, res) => {
    try {
        const pool = await getConnection();
        const aniosActivosQuery = await pool.request().query(querys.anioActivos);

        res.json(aniosActivosQuery.recordset);
    } catch (error) {
        res.json(error);
    }
}

export const getPeriodosActivos = async (req, res) => {
    try {

        const { anio } = req.params
        const pool = await getConnection();
        const periodosActivosQuery = await pool.request().input('anio', sql.VarChar, anio).query(querys.periodosActivos);

        res.json(periodosActivosQuery.recordset);



    } catch (error) {
        res.json(error)
    }
}

export const getSessionActivas = async (req, res) => {
    try {
        const { anio, periodo } = req.params;
        const pool = await getConnection();
        const sessionActivasQuery = await pool.request()
                                              .input('anio', sql.VarChar, anio)
                                              .input('periodo', sql.VarChar, periodo)
                                              .query(querys.sessionActivas);

        res.json(sessionActivasQuery.recordset);
    } catch (error) {
        res.json(error);
    }
}

export const getFechaLimite=async(req,res)=>{
    try {
        const pool = await getConnectionPruebas();
        const fecha = await pool.request().query(querys.fecha);
        res.json(fecha.recordset[0]);
    } catch (error) {
        res.json(error);
    }
}

export const updateFechaLimite = async(req,res)=>{
    try {

    
        const { fechaLimite,dias } = req.body

        const pool = await getConnectionPruebas();
        const updateFecha = await pool.request()
        .input('fecha',sql.DateTime,fechaLimite)
        .input('dias',sql.Int,dias)
        .query(querys.updateFecha);

        if(updateFecha.rowsAffected[0] === 1){
            res.json({
                message:"Se guardo la informacion de forma correcta",
                flag:true
            })
        }else{
            res.json({
                message:"ERROR al actualizar la informacion",
                flag:false
            })
        }
    } catch (error) {
        res.json(error)
    }
}