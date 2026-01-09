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

const crear = async (req, res) => {
    // Recoger parámetros
    let parametros = req.body;

    try {
        // --- VALIDACIÓN ---
        if (!parametros || !parametros.titulo || !parametros.contenido) {
            throw new Error("Faltan datos por enviar");
        }

        let validar_titulo = !validator.isEmpty(parametros.titulo) &&
            validator.isLength(parametros.titulo, { min: 5, max: undefined });

        let validar_contenido = !validator.isEmpty(parametros.contenido);

        if (!validar_titulo || !validar_contenido) {
            throw new Error("El título o contenido no son válidos");
        }

        // --- GUARDADO ---
        const articulo = new Articulo(parametros);
        const articuloGuardado = await articulo.save();

        return res.status(200).json({
            status: "success",
            mensaje: "Artículo creado con éxito",
            articulo: articuloGuardado
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha podido guardar el artículo",
            error_detallado: error.message
        });
    }
}

// ⚠️ CORREGIDO: Ahora es ASYNC y usa AWAIT
const listar = async (req, res) => {

    try {
        // Preparamos la consulta
        let consulta = Articulo.find({});

        if (req.params.ultimos) {
            consulta.limit(3);
        }

        consulta.sort({ fecha: -1 });

        // Ejecutamos la consulta con AWAIT (sin callback)
        const articulos = await consulta.exec();

        if (!articulos || articulos.length === 0) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado artículos!!"
            });
        }

        return res.status(200).send({
            status: "success",
            articulos
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al realizar la consulta",
            error: error.message
        });
    }
}

// ⚠️ CORREGIDO: Ahora es ASYNC, usa AWAIT y tiene la llave de cierre }
const uno = async (req, res) => {
    try {
        let id = req.params.id;

        // Buscamos con AWAIT
        const articulo = await Articulo.findById(id);

        if (!articulo) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el artículo!!"
            });
        }

        return res.status(200).json({
            status: "success",
            articulo
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al buscar el artículo",
            error: error.message
        });
    }
} // <--- ¡AQUÍ FALTABA ESTA LLAVE!

module.exports = {
    prueba,
    curso,
    crear,
    listar,
    uno
}