import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // 1. IMPORTANTE: Para leer el ID de la URL
import { useForm } from "../../hooks/useForm";
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const Editar = () => {

  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [articulo, setArticulo] = useState({}); // Estado para guardar el articulo original
  const params = useParams(); // Obtenemos el ID

  // 2. EFECTO: Cargar el artículo al iniciar
  useEffect(() => {
    conseguirArticulo();
  }, []);

  const conseguirArticulo = async () => {
    const { datos } = await Peticion(Global.url + "articulo/" + params.id, "GET");

    if (datos.status === "success") {
      setArticulo(datos.articulo);
    }
  }

  const editarArticulo = async (e) => {
    e.preventDefault();

    // Recogemos datos nuevos del formulario
    let nuevoArticulo = formulario;

    // ======================================================
    // 3. PETICIÓN DE ACTUALIZACIÓN (PUT)
    // ======================================================
    
    // Usamos el ID de la URL (params.id)
    const { datos } = await Peticion(Global.url + "articulo/" + params.id, "PUT", nuevoArticulo);

    if (datos.status === "success") {

      // 4. SUBIDA DE IMAGEN (Solo si el usuario seleccionó una nueva)
      const fileInput = document.querySelector("#file");

      if (fileInput.files[0]) {
        const formData = new FormData();
        formData.append('file0', fileInput.files[0]);

        // Subimos la imagen
        const subida = await Peticion(Global.url + "subir-imagen/" + params.id, "POST", formData, true);

        if (subida.datos.status === "success") {
          setResultado("guardado");
        } else {
          setResultado("error");
        }
      } else {
        // Si no subió imagen, igual se guardó el texto correctamente
        setResultado("guardado");
      }

    } else {
      setResultado("error");
    }
  }

  return (
    <div className='jumbo'>

      <h1>Editar Artículo</h1>
      <p className='art-edit-post'>Formulario para editar: {articulo.titulo}</p>

      {/* --- MENSAJES DE ALERTA --- */}
      {resultado === "guardado" && (
        <strong className="alerta alerta-exito">¡Artículo actualizado con éxito!</strong>
      )}
      {resultado === "error" && (
        <strong className="alerta alerta-error">Error al actualizar</strong>
      )}

      {/* Montar Formulario */}
      <form className='formulario' onSubmit={editarArticulo}>

        <div className='form-group'>
          <label htmlFor='titulo'>Título</label>
          {/* USAMOS defaultValue PARA PRE-LLENAR EL INPUT */}
          <input
            type="text"
            name='titulo'
            onChange={cambiado}
            defaultValue={articulo.titulo} 
            placeholder="Titulo del articulo"
          />
        </div>

        <div className='form-group'>
          <label htmlFor='contenido'>Contenido</label>
          {/* USAMOS defaultValue EN EL TEXTAREA TAMBIÉN */}
          <textarea
            name="contenido"
            onChange={cambiado}
            defaultValue={articulo.contenido}
            placeholder="Contenido del articulo"
          />
        </div>

        <div className='form-group'>
          <label htmlFor='file0'>Imagen actual</label>

          {/* Contenedor opcional para darle un marquito */}
          <div className="mascara-miniatura">
              {/* Si hay imagen y no es la default */}
              {articulo.imagen !== "default.png" && articulo.imagen &&
                 <img src={Global.url + "imagen/" + articulo.imagen} className="imagen-miniatura" alt="Miniatura actual"/>
              }
              {/* Si es la default */}
              {articulo.imagen === "default.png" &&
                 <img src="https://1000logos.net/wp-content/uploads/2025/03/question-mark.png" className="imagen-miniatura" alt="Miniatura por defecto"/>
              }
          </div>
          <br/>
          <label htmlFor='file0' style={{fontSize: '0.9rem', color: '#888'}}>Cambiar imagen (opcional):</label>
          <input
            type="file"
            name='file0'
            id="file"
            onChange={cambiado}
          />
        </div>

        <input
          type='submit'
          value="Guardar Cambios"
          className='btn btn-success'
        />

      </form>
    </div>
  )
}