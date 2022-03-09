import app from './app'


app.listen(app.get('port'));

console.log("Servico Api Ucq inicializada en el puerto---> ",app.get('port'))