import jwt from 'jsonwebtoken';
import config from '../config';
import { getConnectionPruebas, sql, querys } from '../database';

export const verificarToken = async (req, res, next) => {
 
    try {
        const { token } = req.body;

        if (token === '' || token === undefined) {
            res.json({
                message: "Token no enviado",
                flag: false
            });
        } else {
            const decode = jwt.verify(token, config.secret);
            console.log(decode)
            try {

                const pool = await getConnectionPruebas();
                const userQuery = await pool.request().input('usuario', sql.VarChar, decode.user).query(querys.user);

                if (userQuery.rowsAffected[0] === 0) {
                    res.json({
                        message: "El usuario no existe :(",
                        flag: false
                    })
                } else {
                    console.log(token);
                    next();
                }

            } catch (error) {
                res.json(error)
            }
        }
    } catch (error) {
        res.json({
            message:"Error en el token",
            flag:false
        })
    }

}