import { useSelector } from 'react-redux';
import { useFetch } from "../../../hooks/UseFetch";
import { IEmpresa } from "../../../types/empresa";
import { IDetallePedido } from "../../../types/pedido";
import { RootState } from '../../../redux/Store';

export const Pedido = () => {
  const { data: empresa, loading: loadingEmpresa } = useFetch<IEmpresa>(
    "http://localhost:8080/empresas/3"
  ); //debo pasarle el id desde otro lado

  const cartItems = useSelector((state: RootState) => state.cart.items);

  if (loadingEmpresa) return <h1>Cargando...</h1>;

  return (
    <>
      <h1>{empresa?.nombre}</h1>
      <div>
        {cartItems.length === 0 ? (
          <p>No hay artículos en el carrito.</p>
        ) : (
          <ul>
            {cartItems.map((item: IDetallePedido) => (
              <li key={item.articulo.id}>
                <p>Artículo: {item.articulo.denominacion}</p>
                <p>Cantidad: {item.cantidad}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
