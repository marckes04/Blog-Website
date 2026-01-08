const express = require("express"); // <--- Importamos todo express
const router = express.Router();    // <--- Ahora sí funciona express.Router()

const ArticuloControlador = require("../controllers/Articulo");

router.get("/ruta-de-prueba", ArticuloControlador.prueba); 
router.get("/curso", ArticuloControlador.curso);

module.exports = router;