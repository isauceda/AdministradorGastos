
import { createContext } from "react";
import { Producto } from "../modelos/Producto";

export interface ProductoCarrito extends Producto {
    idcarrito: number;
    ordenCompra: number;
}

export const ContexrProducto = createContext({
    producto: [] as Producto[],
    carritoProducto: [] as ProductoCarrito[],
    actualizarProductos: async () => {},
    agregarCarrito: (producto: Producto) => {},
    eliminarCarrito: (idcarrito: number) => {},
    pagarCarrito: async () => 0,
    });

