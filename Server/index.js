const { conexion } = require('./db/conexion');
const express = require("express");
const cors = require("cors");

// Inicializar App
console.log("App de Node arrancada");

// 1. Conectar a la Base de Datos
conexion();

// 2. Crear servidor Node
const app = express();
const puerto = 3900;

// 3. Configurar CORS (Para que el frontend pueda acceder)
app.use(cors());

// 4. Convertir body a objeto JS (MIDDLEWARES IMPRESCINDIBLES)
// IMPORTANTE: Esto debe ir ANTES de cargar las rutas
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// 5. Cargar archivos de rutas
const rutas_articulo = require("./routes/Articulo");

// 6. Cargar las rutas en el servidor (Prefijo /api)
// Todas las rutas de articulo tendrán delante "/api" -> Ej: /api/crear
app.use("/api", rutas_articulo);

// 7. Ruta de prueba hardcodeada (Para ver si el servidor responde)
app.get("/probando", (req, res) => {
    console.log("Se ha ejecutado el endpoint probando");
    
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
});

// 8. Poner el servidor a escuchar peticiones HTTP
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto: " + puerto);
});