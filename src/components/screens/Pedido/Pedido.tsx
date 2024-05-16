import Sidebar from "../../ui/SideBar/Sidebar";
//Hardcodeo
const categories = [
  { label: "Bebidas" },
  { label: "Hamburguesas" },
  { label: "Pizzas" },
];

export const Pedido = () => {
  return (
    <div>
      lista de los productos agregados al carrito
      <Sidebar categories={categories} />
    </div>
  );
};
