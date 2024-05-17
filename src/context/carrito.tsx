import { ReactNode, createContext, useState } from 'react'
import { Instrumento } from '../types/types';


// Definimos el tipo de dato que se almacenará en el contexto del carrito
interface CartContextType {
  cart: Instrumento[];
  addCarrito: (product: Instrumento) => void;
  removeCarrito: (product: Instrumento) => void;
  removeItemCarrito: (product: Instrumento) => void;
  limpiarCarrito: () => void;
  totalPedido?:number;
}

//crear contexto
export const CartContext = createContext<CartContextType>({
  cart: [],
  addCarrito: () => {},
  removeCarrito: () => {},
  removeItemCarrito: () => {},
  limpiarCarrito: () => {},
  totalPedido: 0
});


//crear provider, encargado de proveer acceso al contexto
export function CarritoContextProvider({ children }: { children: ReactNode }){
    
    const[cart, setCart] = useState<Instrumento[]>([]);
    const[totalPedido, setTotalPedido] = useState<number>(0);

    const addCarrito = async (product: Instrumento) => {
        let existe:boolean = false
        cart.forEach(async (element:Instrumento) => {
            if(element.id === product.id){
                existe = true
                return existe
            }
        });
        
        if (existe) {
            console.log("YA EXISTE");
            product.cantidad += 1
            const cartClonado = await structuredClone(cart.filter(item => item.id !== product.id))
            await cartClonado.push(product)
            setCart(cartClonado)
        } 
        else { // si el producto no esta en el carrito
            console.log("NO EXISTE");
            await setCart(prevCart => [...prevCart, product])
        }   
        calcularTotalCarrito();

    };

    const removeCarrito = async (product: Instrumento) => {
        await setCart(prevCart => prevCart.filter(item => item.id !== product.id))
    };

    const removeItemCarrito = async (product: Instrumento) => {
        //const objetoBuscado = cart.find((objeto:Instrumento) => objeto.id === product.id);
        //const InstrumentoIndice = cart.findIndex((objeto:Instrumento) => objeto.id === product.id)
        //si el producto ya esta en el carrito
        let existe:boolean = false
        cart.forEach(async (element:Instrumento) => {
            if(element.id === product.id){
                existe = true
            } 
        });

        if (existe) {
            console.log("EXISTE");
            if(product.cantidad > 1){
                product.cantidad -= 1
                const cartClonado = await structuredClone(cart.filter(item => item.id !== product.id))
                await cartClonado.push(product)
                setCart(cartClonado)
            }else{
                await setCart(prevCart => prevCart.filter(item => item.id !== product.id))
            }
        }   

        calcularTotalCarrito();
    };

    const limpiarCarrito = () => {
        setCart([])
    }

    const calcularTotalCarrito = async () => {
        let total:number = 0;
        cart.forEach(async (element:Instrumento) => {
            total += element.precio * element.cantidad;
        });
        await setTotalPedido(total);
    }


    return (
    <CartContext.Provider value={{ cart, addCarrito, limpiarCarrito, removeCarrito, removeItemCarrito, totalPedido }}>
      {children}
    </CartContext.Provider>
    );

}