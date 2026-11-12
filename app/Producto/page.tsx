'use client'
import CardProducto from '@/app/Components/CardProducto';
import { Producto } from '@/app/modelos/Producto';
import { useContextProducto } from '@/app/Provider/ProviderProducto'
import React from 'react'

export default function Page() {

    const { producto, agregarCarrito } = useContextProducto();


    return (
        <div className='container'>
            <div className='row'>
                {

                    producto.map((producto: Producto) => (
                        <div className='col-md-4' key={producto.idProducto}>
                            <CardProducto {...producto}></CardProducto>
                            <br />

                        </div>

                    ))
                }

            </div>


        </div>
    )
}

