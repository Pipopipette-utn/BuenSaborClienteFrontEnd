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

  const getPreferenceMP = async () => {
    if (items.length > 0) {
      const response: PreferenceMp = await createPreferenceMp(pedido!);
      console.log("Response: ", response);
      console.log("Response id: ", response.id);
      console.log(pedido);
      if (response) setIdPreference(response.id!);
    } else {
      alert("Agregue al menos un instrumento al carrito");
    }
  };

  useEffect(() => {
    getPreferenceMP();
    initMercadoPago("TEST-bd8b9416-db7c-459e-8f5f-bb08cf78c8e0", {
      locale: "es-AR",
    }); // Credencial de prueba
  }, []);

  return (
    <Wallet
      initialization={{ preferenceId: idPreference }}
      customization={{ texts: { valueProp: "smart_option" } }}
    />
  );
};
