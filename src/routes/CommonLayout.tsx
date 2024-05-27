import React from "react";
import Sidebar from "../components/ui/SideBar/Sidebar";
import { Routes, Route } from "react-router-dom";
import { PantallaMenu } from "../components/screens/Menu/Menu";
import { Pedido } from "../components/screens/Pedido/Pedido";
//Borrar si no lo uso, 27/5
const CommonLayout = () => {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/menu" element={<PantallaMenu />} />
        <Route path="/pedido" element={<Pedido />} />
      </Routes>
    </>
  );
};

export default CommonLayout;
