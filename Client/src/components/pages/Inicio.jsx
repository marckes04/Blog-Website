import React from 'react'
import { Link } from 'react-router-dom' 

export const Inicio = () => {
  return (
    <div className="jumbo">
      <h1>Bienvenido al blog con Rect</h1>
      <p>Desarrollo MERN(mongo DB, Express, React, Node)</p>
      <Link to="/articulos" className='button'> Ver los Articulos</Link>
    </div>
  )
}
