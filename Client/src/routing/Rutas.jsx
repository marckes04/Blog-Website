import React from "react";
// CORRECCIÓN: Es BrowserRouter, no BrowseRouter
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"; 
import { Inicio } from "../components/pages/inicio";
import { Articulos } from "../components/pages/Articulos";

export const Rutas = () => {
    return (
        <BrowserRouter>
            {/* Aquí iría tu Header y Nav si quieres que se vean siempre */}
            
            {/* Contenido central y rutas */}
            <section id="content" className="content">
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/inicio" element={<Inicio />} />
                    <Route path="/articulos" element={<Articulos />} />
                    
                    {/* Ruta para cuando la URL no existe (404) */}
                    <Route path="*" element={ 
                        <div className="jumbo">
                            <h1>Error 404</h1> 
                        </div> 
                    } />
                </Routes>
            </section>

            {/* Aquí iría tu Footer */}
        </BrowserRouter>
    );
};
