import React from 'react'

export const Listado = ({articulos,setArticulos}) => {
  return (
    articulos.map((articulo) => {
                    return (
                    <article key={articulo._id} className="articulo-item">
                        <div className="encabezado">
                            <h3 className="title">{articulo.titulo}</h3>
                        </div>
                        <div className="cuerpo">
                            <div className="mascara">
                                {/* OJO: Aquí falta la lógica para mostrar la imagen real si existe */}
                                <img
                                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="Imagen del articulo"
                                />
                            </div>
                            <div className="datos">
                                <p className="description">{articulo.contenido}</p>
                                <div className="acciones">
                                    <button className="button edit">Editar</button>
                                    <button className="button delete">Borrar</button>
                                </div>
                            </div>
                        </div>
                    </article>
                    );
                })
            )
}
