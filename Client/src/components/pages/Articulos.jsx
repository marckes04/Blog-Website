import React from "react";

export const Articulos = () => {
  return (
    <>
      <article className="articulo-item">
        
        {/* 1. EL TÍTULO VA ARRIBA DEL TODO (OCUPA TODO EL ANCHO) */}
        <div className="encabezado">
            <h3 className="title">Desarrollo web moderno</h3>
        </div>

        {/* 2. EL "CUERPO" CONTIENE LA IMAGEN Y EL TEXTO LADO A LADO */}
        <div className="cuerpo">
            
            {/* Columna Izquierda: Imagen */}
            <div className="mascara">
                <img src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Imagen del articulo" />
            </div>

            {/* Columna Derecha: Texto y Botones */}
            <div className="datos">
                <p className="description">
                    Aprende las tecnologías más punteras como React, Node y MongoDB en victorroblesweb.es
                </p>
                
                {/* Botones justo debajo del párrafo */}
                <div className="acciones">
                    <button className="button edit">Editar</button>
                    <button className="button delete">Borrar</button>
                </div>
            </div>

        </div>

      </article>

      {/* --- REPETIR PARA OTROS ARTÍCULOS --- */}
       <article className="articulo-item">
        <div className="encabezado">
            <h3 className="title">Inteligencia Artificial</h3>
        </div>
        <div className="cuerpo">
            <div className="mascara">
                <img src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="AI" />
            </div>
            <div className="datos">
                <p className="description">El futuro de la programación con redes neuronales.</p>
                <div className="acciones">
                    <button className="button edit">Editar</button>
                    <button className="button delete">Borrar</button>
                </div>
            </div>
        </div>
      </article>

    </>
  );
};