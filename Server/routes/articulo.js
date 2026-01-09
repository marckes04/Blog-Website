const express = require("express"); // <--- Importamos todo express
const router = express.Router();    // <--- Ahora sí funciona express.Router()

const ArticuloControlador = require("../controllers/Articulo");

router.get("/ruta-de-prueba", ArticuloControlador.prueba); 
router.get("/curso", ArticuloControlador.curso);

router.post("/crear", ArticuloControlador.crear);
router.get("/articulos/", ArticuloControlador.listar);
router.get("/articulo/:id", ArticuloControlador.uno);
router.delete("/articulo/:id", ArticuloControlador.borrar);
router.put("/articulo/:id", ArticuloControlador.editar);


module.exports = router;