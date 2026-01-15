import React from 'react'
import { Link } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';

export const Listado = ({articulos, setArticulos}) => {

    const eliminar = async(id) => {
        let{datos} = await Peticion(Global.url+"articulo/"+id, "DELETE")

        if(datos.status === "success") {
            let articulosActualizados = articulos.filter(articulo => articulo._id !== id);
            setArticulos(articulosActualizados);
        }
    }

    return (
        articulos.map((articulo) => {
            return (
                <article key={articulo._id} className="articulo-item">
                    <div className="encabezado">
                        {/* AQUI ESTABA EL ERROR */}
                        <h3 className='title art'>
                            {/* 1. Agregamos el slash '/' antes del ID */}
                            {/* 2. Metemos el titulo DENTRO del Link para poder darle clic */}
                            <Link to={"/articulo/" + articulo._id}>{articulo.titulo}</Link>
                        </h3>
                    </div>
                    
                    <div className="cuerpo">
                        <div className="mascara">
                            {articulo.imagen !== "default.png" && 
                                <img src={Global.url + "imagen/" + articulo.imagen} alt="Imagen del articulo" />
                            }
                            {articulo.imagen === "default.png" && 
                                <img src="https://1000logos.net/wp-content/uploads/2025/03/question-mark.png" alt="Imagen del articulo" />
                            }            
                        </div>
                        <div className="datos">
                            {/* Eliminé el link duplicado vacío que tenías aquí para limpiar el código */}
                            <p className="description">{articulo.contenido}</p>

                            <div className="acciones">
                                {/* Convertí el botón editar en Link para que funcione la navegación */}
                                <Link to={"/editar/" + articulo._id} className="button edit">Editar</Link>
                                
                                <button className="button delete" onClick={() => {
                                    eliminar(articulo._id)
                                }}>Borrar</button>
                            </div>
                        </div>
                    </div>
                </article>
            );
        })
    )
}