const express = require("express");
const multer = require("multer");
const ArticuloControlador = require("../controllers/articulo");

const router = express.Router();

// --- CONFIGURACIÓN MULTER ---
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        // Asegúrate de que esta carpeta exista en tu proyecto
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

// --- CORRECCIÓN DEL ERROR "PathError" ---
// En lugar de usar ?, creamos dos rutas separadas:
router.get("/articulos", ArticuloControlador.listar);          // Para listar todos
router.get("/articulos/:ultimos", ArticuloControlador.listar); // Para listar los últimos X

router.get("/articulo/:id", ArticuloControlador.uno);
router.delete("/articulo/:id", ArticuloControlador.borrar);
router.put("/articulo/:id", ArticuloControlador.editar);

// Ruta para subir imagen
router.post("/subir-imagen/:id", subidas.any(), ArticuloControlador.subir);

// Ruta para sacar imagen
router.get("/imagen/:fichero", ArticuloControlador.imagen);

// Ruta para buscar
router.get("/buscar/:busqueda", ArticuloControlador.buscar);

module.exports = router;