import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { PreferenceMp } from "../../types/PreferenceMP";
import { createPreferenceMp } from "../../services/CreatePreference";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";

export const CheckoutMp: React.FC = () => {
  const pedido = useSelector((state: RootState) => state.selectedData.pedido);
  const items = useSelector((state: RootState) => state.cart.items);
  const [idPreference, setIdPreference] = useState<string>("");

  initMercadoPago("TEST-bd8b9416-db7c-459e-8f5f-bb08cf78c8e0", {
    locale: "es-AR",
  }); // Credencial de prueba
  useEffect(() => {
    const getPreferenceMP = async () => {
      if (items.length > 0 && pedido) {
        try {
          const response: PreferenceMp = await createPreferenceMp(pedido);
          console.log("Response: ", response);
          console.log("Response id: ", response.id);
          console.log(pedido);
          if (response && response.id) {
            setIdPreference(response.id);
          }
        } catch (error) {
          console.error("Error creating preference: ", error);
        }
      } else {
        alert("Agregue al menos un articulo al carrito");
      }
    };

    getPreferenceMP();
  }, [pedido]);

  return idPreference ? (
    <Wallet
      initialization={{ preferenceId: idPreference }}
      customization={{ texts: { valueProp: "smart_option" } }}
    />
  ) : null;
};
