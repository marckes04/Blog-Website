const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy el método prueba del controlador de Articulo"
    })
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
    }
]);
}

module.exports = {
    prueba,
    curso
}