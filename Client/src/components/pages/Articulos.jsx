import React from "react";
import { useState, useEffect } from "react";

export const Articulos = () => {
  const [articulos, SetArticulos] = useState([]);

  useEffect(() => {
    let data = [
      {
        _id: 1,
        titulo: "Titulo 1",
        Contenido: "Contenido",
      },
      {
        _id: 2,
        titulo: "Titulo 2",
        Contenido: "Contenido",
      },
      {
        _id: 3,
        titulo: "Titulo 3",
        Contenido: "Contenido",
      },
    ];
    SetArticulos(data);
  }, []);

  return (
    <>
      {articulos.map((articulo) => {
        return (
          <article key ={articulo._id}className="articulo-item">
            {/* 1. EL TÍTULO VA ARRIBA DEL TODO (OCUPA TODO EL ANCHO) */}
            <div className="encabezado">
              <h3 className="title">{articulo.titulo}</h3>
            </div>

            {/* 2. EL "CUERPO" CONTIENE LA IMAGEN Y EL TEXTO LADO A LADO */}
            <div className="cuerpo">
              {/* Columna Izquierda: Imagen */}
              <div className="mascara">
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Imagen del articulo"
                />
              </div>

              {/* Columna Derecha: Texto y Botones */}
              <div className="datos">
                <p className="description">{articulo.Contenido}</p>

                {/* Botones justo debajo del párrafo */}
                <div className="acciones">
                  <button className="button edit">Editar</button>
                  <button className="button delete">Borrar</button>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
};
