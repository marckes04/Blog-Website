import React from "react";
// CORRECCIÓN: Es BrowserRouter, no BrowseRouter
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"; 
import { Inicio } from "../components/pages/inicio";
import { Articulos } from "../components/pages/Articulos";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";

export const Rutas = () => {
    return (
        <BrowserRouter>
            {/* Aquí iría tu Header y Nav si quieres que se vean siempre */}
                <Header/>
                <Nav/>
            {/* Contenido central y rutas */}
            <section id="content" className="content">
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/inicio" element={<Inicio />} />
                    <Route path="/articulos" element={<Articulos />} />
                </Routes>
            </section>
            
                    <Sidebar/>
            {/* Aquí iría tu Footer */}
                    <Footer/>
        </BrowserRouter>
        
    );
};


