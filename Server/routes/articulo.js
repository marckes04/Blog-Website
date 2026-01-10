const express = require("express");
const multer = require("multer");
const ArticuloControlador = require("../controllers/articulo");


const router = express.Router();

// --- CONFIGURACIÓN MULTER ---
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        // Asegúrate de que esta carpeta exista
        cb(null, './images/articles/');
    },
    filename: (req, file, cb) => {
        // Nombre único para el archivo
        cb(null, "articulo" + Date.now() + file.originalname);
    }
});

const subidas = multer({ storage: almacenamiento });
// ----------------------------

// Rutas de prueba
router.get("/ruta-de-prueba", ArticuloControlador.prueba);
router.get("/curso", ArticuloControlador.curso);

// Rutas funcionales
router.post("/crear", ArticuloControlador.crear);
router.get("/articulos/:id", ArticuloControlador.listar);
router.get("/articulo/:id", ArticuloControlador.uno);
router.delete("/articulo/:id", ArticuloControlador.borrar);
router.put("/articulo/:id", ArticuloControlador.editar);
router.post("/subir-imagen/:id", subidas.any(), ArticuloControlador.subir);
router.get("/imagen/:fichero", ArticuloControlador.imagen)

module.exports = router;