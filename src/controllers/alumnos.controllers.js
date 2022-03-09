
import { VarBinary } from "mssql";
import { getConnection, querys, sql } from "../database";
import { Alumno } from "../models/alumnos";
import { Persona } from "../models/persona";

export const getAlumnos = async (req,res)=>{
    try {

        const { anio,periodo,session } = req.body
        const pool = await getConnection();

        if(session=='' || session== undefined){
            const alumnos = await  pool.request().input('anio',sql.VarChar,anio).input('periodo',sql.VarChar,periodo).query(querys.getAlumnos+" AND  A.ACADEMIC_SESSION<>''");
            res.json(alumnos.recordset);
        }else{
            const alumnos = await  pool.request().input('anio',sql.VarChar,anio).input('periodo',sql.VarChar,periodo)
            .input('session',sql.VarChar,session)
            .query(querys.getAlumnos+" AND A.ACADEMIC_SESSION=@session");
            res.json(alumnos.recordset);
        }

    } catch (error) {
       res.json(error) 
    }
}

export const getAlumno = async (req,res)=>{
    try {

        const {matricula} = req.params;

        let alumno = new Alumno ()

        alumno.persona= await getDatosPersona(matricula);
        alumno.tutores= await getTutores(matricula);

        res.json(alumno)
        
    } catch (error) {
        res.json(error);
    }
}

async function  getDatosPersona(matricula){
    try {

        const pool = await getConnection();

        const datosPersona = await pool.request().input('matricula',sql.VarChar,matricula).query(querys.datosPersona);

        let datos = new Persona();
        datos.matricula=datosPersona.recordset[0].matricula;
        datos.personId=datosPersona.recordset[0].personId;
        datos.nombre=datosPersona.recordset[0].nombre;
        datos.segundoNombre=datosPersona.recordset[0].segundoNombre;
        datos.apellidoPaterno=datosPersona.recordset[0].apellidoPaterno;
        datos.apellidoMaterno=datosPersona.recordset[0].apellidoMaterno;
        datos.correos = await getCorreos(matricula);
        datos.telefonos = await getTelefonos(datos.personId);

        return datos;
        
    } catch (error) {
        return error;
    }
}

async function getCorreos(matricula){
    try {
        const pool = await getConnection();
        const correosQuery = await pool.request().input('matricula',sql.VarChar,matricula).query(querys.getCorreos);

        let correos = []
        for(let i=0;i<correosQuery.rowsAffected[0];i++){

            correos.push(correosQuery.recordset[i]);
        }


        return correos;
            
        
    } catch (error) {
        
    }
}

async function getTelefonos(personId){
    try {
      
        
        const pool = await getConnection();
        const telefonosQuery = await pool.request().input('personId',sql.Int,personId).query(querys.getTelefonos);

        let telefonos = []
        for(let i=0;i<telefonosQuery.rowsAffected[0];i++){

            telefonos.push(telefonosQuery.recordset[i]);
        }


        return telefonos;
            
        
    } catch (error) {
        
    }
}

async function getTutores(matricula){
    try {
        
        const pool = await getConnection();
        const tutoresQuery = await pool.request().input('matricula',sql.VarChar,matricula).query(querys.getTutoresAlumno);

        

        let tutores = [];

        for(let i=0;i<tutoresQuery.rowsAffected[0];i++){
            
            let tutor = await getDatosPersona(tutoresQuery.recordset[i].matricula);

            tutores.push(tutor);
            
        }

    
        return tutores;
    } catch (error) {
        res.json(error);
    }
}

export const cambiarStatusCorreo = async (req,res)=>{
    try {
        const {id,status} = req.body;
        console.log(!status)
        const pool = await getConnection();
        const updateStatusCorreo = await pool.request().input('status',sql.Bit,!status).input('id',sql.Int,id).query(querys.updateStatusCorreo);

        if(updateStatusCorreo.rowsAffected >0){
            res.status(200).json({
                message:'Se actualizo la informacion de Formacorrecta',
                flag:true
            })
        }else{
            res.status(200).json({
                message:'No se puedo actualizar la informacion',
                flag:false
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message:'No se puedo actualizar la informacion',
            flag:false
        })
    }
}