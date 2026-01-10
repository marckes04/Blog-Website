const validator = require("validator");
const Articulo = require("../model/Articulo"); // Asegúrate de que la carpeta sea 'model' o 'models'
const { validarArticulo } = require("../helpers/validar");
const fs = require("fs");
const path = require("path");

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
    }]);
}

const crear = async (req, res) => {
    let parametros = req.body;

    try {
        validarArticulo(parametros);
        
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
        let consulta = Articulo.find({});
        if (req.params.ultimos) {
            consulta.limit(3);
        }
        consulta.sort({ fecha: -1 });
        const articulos = await consulta.exec();

        if (!articulos || articulos.length === 0) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado artículos!!"
            });
        }
        return res.status(200).send({ status: "success", articulos });
    } catch (error) {
        return res.status(500).json({ status: "error", mensaje: "Error consulta", error: error.message });
    }
}

const uno = async (req, res) => {
    try {
        let id = req.params.id;
        const articulo = await Articulo.findById(id);
        if (!articulo) {
            return res.status(404).json({ status: "error", mensaje: "No existe el artículo" });
        }
        return res.status(200).json({ status: "success", articulo });
    } catch (error) {
        return res.status(500).json({ status: "error", mensaje: "Error al buscar", error: error.message });
    }
}

const borrar = async (req, res) => {
    try {
        let articuloId = req.params.id;
        const articuloBorrado = await Articulo.findOneAndDelete({ _id: articuloId });
        if (!articuloBorrado) {
            return res.status(404).json({ status: "error", mensaje: "No existe para borrar" });
        }
        return res.status(200).json({ status: "success", articulo: articuloBorrado });
    } catch (error) {
        return res.status(500).json({ status: "error", mensaje: "Error al borrar", error: error.message });
    }
}

const editar = async (req, res) => {
    let articuloId = req.params.id;
    let parametros = req.body;
    try {
        validarArticulo(parametros);
        const articuloActualizado = await Articulo.findOneAndUpdate(
            { _id: articuloId }, parametros, { new: true }
        );
        if (!articuloActualizado) {
            return res.status(404).json({ status: "error", mensaje: "No existe para editar" });
        }
        return res.status(200).json({ status: "success", articulo: articuloActualizado });
    } catch (error) {
        return res.status(400).json({ status: "error", mensaje: "Error editar", motivo: error.message });
    }
}

// --- FUNCIÓN DE SUBIDA DE IMAGEN ARREGLADA ---
const subir = async (req, res) => {
    
    // 1. Recoger el archivo (Soporte para .any() y .single())
    let archivo = null;

    if (req.files && req.files.length > 0) {
        archivo = req.files[0];
    } else if (req.file) {
        archivo = req.file;
    }

    // 2. Si no hay archivo, devolvemos error
    if (!archivo) {
        return res.status(404).json({
            status: "error",
            mensaje: "Petición inválida, no has enviado ninguna imagen"
        });
    }

    // 3. Conseguir el nombre del archivo
    let nombreArchivo = archivo.filename;

    // 4. Sacar la extensión del archivo
    let extension_split = nombreArchivo.split('\.');
    let extension = extension_split[extension_split.length - 1].toLowerCase();

    // 5. Comprobar extensión correcta
    if(extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "gif"){
        
        // Borrar el archivo subido si no es válido
        // fs.unlink borra el archivo físico de la carpeta
        fs.unlink(archivo.path, (error) => {
            return res.status(400).json({
                status: "error",
                mensaje: "Extensión de la imagen inválida"
            });
        });
        return; // Paramos la ejecución para que no guarde en BD
    }

    // 6. Si la imagen es correcta, guardar en BD
    let articuloId = req.params.id;

    try {
        // Buscamos y actualizamos
        const articuloActualizado = await Articulo.findOneAndUpdate(
            {_id: articuloId}, 
            {imagen: nombreArchivo}, // Guardamos el nombre del archivo en el campo 'imagen'
            {new: true}
        );

        if(!articuloActualizado){
            return res.status(404).json({
                status: "error",
                mensaje: "Error al guardar la imagen en la BD (ID no existe)"
            });
        }

        // Devolvemos respuesta de éxito
        return res.status(200).json({
            status: "success",
            mensaje: "Imagen subida correctamente",
            articulo: articuloActualizado,
            fichero: archivo
        });

    } catch (error) {
        return res.status(500).json({ 
            status: "error", 
            mensaje: "Error en el servidor al subir imagen", 
            error: error.message 
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
    editar,
    subir
}