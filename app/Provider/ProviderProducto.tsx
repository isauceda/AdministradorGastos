
'use client'

import React, { useContext, useEffect, useState } from 'react'
import { Plantilla } from '../modelos/Plantilla'
import { Producto } from '../modelos/Producto'
import { ContexrProducto, ProductoCarrito } from '../Context/ContextProducto'

const URL = 'http://localhost:5000'

export default function ProviderProducto({ children }: Plantilla) {

    const [producto, setProducto] = useState<Producto[]>([])
    const [carritoProducto, setCarritoProducto] = useState<ProductoCarrito[]>([])

    const [ordenCompra] = useState(() => Math.floor(Date.now() / 1000))

    // Cargar productos desde PostgreSQL
    async function cargarProductos() {
        try {
            const respuesta = await fetch(`${URL}/producto`)
            const datos = await respuesta.json()

            if (respuesta.ok) {
                setProducto(datos.map((item: Producto) => ({
                    ...item,
                    precioProducto: Number(item.precioProducto),
                    isvProducto: Number(item.isvProducto)
                })))
            } else {
                setProducto([])
            }

        } catch (error) {
            console.log('Error al cargar productos:', error)
        }
    }

    useEffect(() => {
        cargarProductos()
    }, [])

    // Consultar productos del carrito
    async function cargarCarrito() {
        try {
            const respuesta = await fetch(`${URL}/carrito/${ordenCompra}`)
            const datos = await respuesta.json()

            if (respuesta.ok) {
                const lista = datos.map((item: {
                    idcarrito: number,
                    idproducto: number,
                    isvProducto: number,
                    ordenCompra: number
                }) => {
                    const encontrado = producto.find(
                        p => p.idProducto === item.idproducto
                    )

                    return {
                        ...encontrado,
                        idcarrito: item.idcarrito,
                        ordenCompra: item.ordenCompra,
                        isvProducto: Number(item.isvProducto)
                    }
                }).filter((item: ProductoCarrito) => item.idProducto !== undefined)

                setCarritoProducto(lista)
            }

        } catch (error) {
            console.log('Error al consultar carrito:', error)
        }
    }

    useEffect(() => {
        if (producto.length > 0) {
            cargarCarrito()
        }
    }, [producto])

    // Agregar producto al carrito
    async function agregarCarrito(producto: Producto) {
        try {
            const respuesta = await fetch(`${URL}/carrito`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idproducto: producto.idProducto,
                    isvProducto: producto.isvProducto,
                    ordenCompra: ordenCompra
                })
            })

            if (respuesta.ok) {
                alert('Producto agregado al carrito')
                cargarCarrito()
            } else {
                alert('No se pudo agregar el producto')
            }

        } catch (error) {
            console.log('Error al agregar:', error)
        }
    }

    // Eliminar producto del carrito
    async function eliminarCarrito(idcarrito: number) {
        try {
            const respuesta = await fetch(`${URL}/carrito/${idcarrito}`, {
                method: 'DELETE'
            })

            if (respuesta.ok) {
                alert('Producto eliminado del carrito')
                cargarCarrito()
            }

        } catch (error) {
            console.log('Error al eliminar:', error)
        }
    }

    // Calcular el total de la compra
    async function pagarCarrito() {
        try {
            const respuesta = await fetch(
                `${URL}/carrito/${ordenCompra}/pagar`
            )

            const datos = await respuesta.json()

            if (respuesta.ok) {
                return Number(datos.total)
            }

            alert(datos.mensaje)
            return 0

        } catch (error) {
            console.log('Error al pagar:', error)
            return 0
        }
    }

    return (
        <ContexrProducto.Provider value={{
            producto,
            carritoProducto,
            actualizarProductos: cargarProductos,
            agregarCarrito,
            eliminarCarrito,
            pagarCarrito
        }}>
            {children}
        </ContexrProducto.Provider>
    )
}

export function useContextProducto() {
    return useContext(ContexrProducto)
}

