import React, { useState } from 'react';
import { useForm } from "../../hooks/useForm";
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const Crear = () => {

  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");

  const guardarArticulo = async (e) => {
    e.preventDefault();

    // ======================================================
    // 1. VALIDACIÓN PREVIA (Lo nuevo)
    // ======================================================
    
    // Extraemos los valores actuales del formulario
    let { titulo, contenido } = formulario;

    // REGLA 1: Validar que no estén vacíos o sean muy cortos
    if (!titulo || !contenido || titulo.length < 3 || contenido.length < 3) {
        setResultado("error");
        return; // <--- ESTO DETIENE LA EJECUCIÓN. No sigue bajando.
    }

    // REGLA 2: (Opcional) Validar el archivo antes de subirlo
    const fileInput = document.querySelector("#file");
    
    // Si quieres obligar a que suban imagen, descomenta esto:
    /*
    if (!fileInput.files[0]) {
        setResultado("error");
        return; 
    }
    */

    // ======================================================
    // 2. ENVÍO AL BACKEND (Solo llega aquí si pasó la validación)
    // ======================================================

    let nuevoArticulo = formulario;

    // Guardar articulo (Datos de texto)
    const { datos } = await Peticion(Global.url + "crear", "POST", nuevoArticulo);

    if (datos.status === "success") {

      // Gestión de Imagen
      if (fileInput.files[0]) {
        
        const formData = new FormData();
        formData.append('file0', fileInput.files[0]);

        const subida = await Peticion(Global.url + "subir-imagen/" + datos.articulo._id, "POST", formData, true);

        if (subida.datos.status === "success") {
          setResultado("guardado");
        } else {
          setResultado("error");
        }

      } else {
        setResultado("guardado");
      }

    } else {
      setResultado("error");
    }
  }

  return (
    <div className='jumbo'>

      <h1>Crear Artículo</h1>
      <p className='art-edit-post'>Formulario para crear un nuevo artículo</p>

      {/* --- MENSAJES DE ALERTA --- */}
      
      {resultado === "guardado" && (
        <strong className="alerta alerta-exito">
          ¡Artículo guardado con éxito!
        </strong>
      )}

      {resultado === "error" && (
        <strong className="alerta alerta-error">
          Los datos son incorrectos o faltan campos obligatorios
        </strong>
      )}

      {/* Montar Formulario */}
      <form className='formulario' onSubmit={guardarArticulo}>

        <div className='form-group'>
          <label htmlFor='titulo'>Título</label>
          <input
            type="text"
            name='titulo'
            onChange={cambiado}
            placeholder="Ej: Tutorial de React 2024"
            required // Validación HTML básica
          />
        </div>

        <div className='form-group'>
          <label htmlFor='contenido'>Contenido</label>
          <textarea
            name="contenido"
            onChange={cambiado}
            placeholder="Escribe el contenido del artículo aquí..."
            required // Validación HTML básica
          />
        </div>

        <div className='form-group'>
          <label htmlFor='file0'>Imagen</label>
          <input
            type="file"
            name='file0'
            id="file"
            onChange={cambiado}
          />
        </div>

        <input
          type='submit'
          value="Guardar"
          className='btn btn-success'
        />

      </form>
    </div>
  )
}