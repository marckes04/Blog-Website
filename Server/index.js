// Usamos llaves { } para sacar la función del objeto (Destructuring)
// Usamos ./ porque la carpeta db está al lado de index.js
const { conexion } = require('./db/conexion'); 

console.log("App node arrancada");

// Ahora sí ejecutamos la función
conexion();