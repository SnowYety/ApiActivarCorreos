import { getConnectionPruebas, querys, sql } from "../database"
import config from "../config";
import jwt from 'jsonwebtoken';


export const signIn = async(req,res)=>{
    try {

        const {user,password} = req.body;
        const pool = await getConnectionPruebas();
        const userQuery = await pool.request().input('usuario',sql.VarChar,user).query(querys.user);

        if(userQuery.rowsAffected[0] === 0){
            res.json({
                message:"El usuario no existe :(",
                flag:false
            })
        }else{
            
            if(userQuery.recordset[0].password === password){
                const token = jwt.sign({user:user},config.secret,{
                    expiresIn:3600
                });

                res.json({
                    message:'Todo bien, todo correcto y yo que me algro',
                    token:token,
                    flag:true
                })
            }else{
                console.log('entr')
                res.json({
                    message:'Contraseña Incorrecta :(',
                    flag:false
                })
            }
        }


    } catch (error) {
        res.json(error)
    }
}