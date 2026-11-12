
'use client'

import React from 'react'
import { Producto } from '../modelos/Producto'
import { useContextProducto } from '../Provider/ProviderProducto'

interface Props extends Producto {
    esCarrito?: boolean;
    idcarrito?: number;
}

export default function CardProducto(producto: Props) {

    const { agregarCarrito, eliminarCarrito } = useContextProducto()

    return (
        <div className="card">
            <div className="card-header">
                {producto.nombreProducto}
            </div>

            <div className="card-body">
                <p>Precio Producto - Lps {producto.precioProducto}</p>
                <p>ISV Producto - Lps {producto.isvProducto}</p>

                {producto.imgProducto && (
                    <img
                        src={producto.imgProducto}
                        alt={producto.nombreProducto}
                        className="img-fluid"
                    />
                )}
            </div>

            <div className="card-footer">
                {producto.esCarrito ? (
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => eliminarCarrito(producto.idcarrito!)}
                    >
                        Eliminar
                    </button>
                ) : (
                    <button
                        className="btn btn-info btn-sm"
                        onClick={() => agregarCarrito(producto)}
                    >
                        Agregar al Carrito
                    </button>
                )}
            </div>
        </div>
    )
}

