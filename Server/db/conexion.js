const mongoose = require("mongoose");

const conexion = async () => {
    try {
        // Esperamos a que se conecte
        await mongoose.connect("mongodb://localhost:27017/mi_blog");
        
        // ¡IMPORTANTE! Un mensaje para saber si funcionó
        console.log("Conectado correctamente a la base de datos: mi_blog !!");
    
    } catch (error) { // <--- Agregamos (error) aquí para poder leerlo
        console.log(error);
        throw new Error("No se pudo conectar a la base de datos");
    }
}

module.exports = {
    conexion
}