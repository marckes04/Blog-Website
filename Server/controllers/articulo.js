const validator = require("validator");
const Articulo = require("../model/Articulo"); 

const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy el método prueba del controlador de Articulo"
    });
}

const curso = (req, res) => {
    return res.status(200).json([{
        curso: "Master en Frameworks JS",
        autor: "Mario Espitia",
        url: "marioespitia.com"
    },
    {
        curso: "Master en React",
        autor: "Mario Espitia",
        url: "marioespitia.com"
    }]);
}

// 1. Agregamos ASYNC aquí para poder esperar a la base de datos
const crear = async (req, res) => {
    
    // Recoger parámetros
    let parametros = req.body;

    try {
        // --- VALIDACIÓN ---
        // Validación de seguridad básica
        if (!parametros || !parametros.titulo || !parametros.contenido) {
            throw new Error("Faltan datos por enviar");
        }

        // Validar Título y Contenido
        // Nota: quité el "undefined" que tenías en isLength, no es necesario.
        let validar_titulo = !validator.isEmpty(parametros.titulo) && 
                             validator.isLength(parametros.titulo, { min: 5, max: undefined });
        
        let validar_contenido = !validator.isEmpty(parametros.contenido);

        if (!validar_titulo || !validar_contenido) {
            throw new Error("El título o contenido no son válidos");
        }

        // --- GUARDADO EN BASE DE DATOS (NUEVA FORMA) ---
        
        // 1. Crear el objeto
        const articulo = new Articulo(parametros); 

        // 2. Guardar usando AWAIT (Esperamos a que la BD responda)
        const articuloGuardado = await articulo.save();

        // 3. Devolver resultado de éxito
        return res.status(200).json({
            status: "success",
            mensaje: "Artículo creado con éxito",
            articulo: articuloGuardado
        });

    } catch (error) {
        // Este catch ahora captura TANTO errores de validación COMO errores de base de datos
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha podido guardar el artículo",
            error_detallado: error.message 
        });
    }
}

module.exports = {
    prueba,
    curso,
    crear
}