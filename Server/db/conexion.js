const mongoose = require("mongoose");

const conexion = async () => {
    try {
        // CAMBIO CRUCIAL: Quita "localhost" y pon "127.0.0.1"
        // Esto obliga a usar la dirección IP directa y no falla nunca.
        await mongoose.connect("mongodb://127.0.0.1:27017/mi_blog"); 

        console.log("Conectado correctamente a la base de datos: mi_blog !!");
    
    } catch (error) {
        console.log(error);
        throw new Error("No se pudo conectar a la base de datos");
    }
}

module.exports = { conexion }