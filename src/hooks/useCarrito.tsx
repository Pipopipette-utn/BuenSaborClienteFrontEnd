import { useContext } from 'react'
import { CartContext } from '../context/carritoContext'



export const useCarrito = () => {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCarrito debe ser usado dentro del ambito de un CartProvider')
  }

  return context
}