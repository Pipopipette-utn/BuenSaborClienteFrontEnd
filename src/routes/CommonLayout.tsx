import Sidebar from "../components/ui/SideBar/Sidebar";
import { Routes, Route } from "react-router-dom";
import PantallaMenu from "../components/screens/Menu/Menu";
//Borrar si no lo uso, 27/5
const CommonLayout = () => {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/menu" element={<PantallaMenu />} />
      </Routes>
    </>
  );
};

export default CommonLayout;
