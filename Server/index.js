// Si usas Windows, prueba con la ruta completa (ajusta tu usuario)
// Ojo: usa barras dobles \\
const { conexion } = require('D:\\Personal Documents\\Portfolio Projects\\Blog-Website\\Server\\db\\conexion');
const express = require("express");
const cors = require("cors"); // <--- Esto fallará si no haces "npm install cors"

console.log("App node arrancada");

// 1. Conectar a la BD
conexion();

// 2. Crear servidor
const app = express();
const puerto = 3900;

// 3. Configurar cors (Permite peticiones desde el frontend)
app.use(cors());

// 4. Convertir body a objeto js (Para recibir JSON)
app.use(express.json());

const rutas_articulo = require("./routes/Articulo");

// Cargar rutas
app.use("/api", rutas_articulo);


// 5. Rutas
app.get("/probando", (req, res) => {
    return res.status(200).json([
        {
        curso: "Master en Frameworks JS",
        autor: "Mario Espitia",
        url: "marioespitia.com"
        },
        {
        curso: "Master en React",
        autor: "Mario Espitia",
        url: "marioespitia.com"
        }
    ]);
});

// 6. Escuchar
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto: " + puerto);
});