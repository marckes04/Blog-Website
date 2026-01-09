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

const listar = async (req, res) => {
    try {
        // Preparamos la consulta
        let consulta = Articulo.find({});

        if (req.params.ultimos) {
            consulta.limit(3);
        }

        consulta.sort({ fecha: -1 });

        // Ejecutamos la consulta con AWAIT
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
}

// ⚠️ CORREGIDO: Convertido a ASYNC/AWAIT y arregladas las llaves
const borrar = async (req, res) => {
    try {
        let articuloId = req.params.id;

        // Usamos findOneAndDelete con AWAIT (sin callback)
        const articuloBorrado = await Articulo.findOneAndDelete({ _id: articuloId });

        if (!articuloBorrado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el artículo para borrar"
            });
        }

        return res.status(200).json({
            status: "success",
            articulo: articuloBorrado,
            mensaje: "Método borrar artículo"
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al borrar el artículo",
            error: error.message
        });
    }
}

const editar = async (req, res) => {
    // 1. Recoger ID y Datos
    let articuloId = req.params.id;
    let parametros = req.body;

    try {
        // --- VALIDACIÓN ---
        // Validar si parametros existe primero
        if (!parametros || Object.keys(parametros).length === 0) {
            throw new Error("No has enviado datos en el Body");
        }

        let validar_titulo = !validator.isEmpty(parametros.titulo) &&
            validator.isLength(parametros.titulo, { min: 5, max: undefined });

        let validar_contenido = !validator.isEmpty(parametros.contenido);

        if (!validar_titulo || !validar_contenido) {
            throw new Error("La validación falló: Título (min 5 letras) o Contenido incorrectos.");
        }

        // --- ACTUALIZAR ---
        const articuloActualizado = await Articulo.findOneAndUpdate(
            { _id: articuloId }, 
            parametros, 
            { new: true } 
        );

        if (!articuloActualizado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No existe un artículo con ese ID para editar"
            });
        }

        return res.status(200).json({
            status: "success",
            articulo: articuloActualizado,
            mensaje: "Artículo actualizado con éxito"
        });

    } catch (error) {
        // ⚠️ IMPORTANTE: Mira la terminal de VS Code cuando falle
        console.log("\n❌ ERROR EN EDITAR:", error); 

        return res.status(400).json({
            status: "error",
            mensaje: "Error al actualizar el artículo",
            motivo: error.message // Esto te dirá qué pasó en Postman
        });
    }
}


module.exports = {
    prueba,
    curso,
    crear,
    listar,
    uno,
    borrar,
    editar
}