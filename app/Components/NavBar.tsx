
'use client'

import Link from 'next/link'
import React from 'react'
import { useUsuario } from '../Provider/ProviderUsuario'
import { useContextProducto } from '../Provider/ProviderProducto'

export default function NavBar() {

    const { nombreUsuario } = useUsuario()
    const { carritoProducto } = useContextProducto()

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">

                <Link className="navbar-brand" href="/Producto">
                    E-commerce
                </Link>

                <div id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link className="nav-link" href="/Producto">
                                Lista Producto
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="/AdminProducto">
                                Administración Producto
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="/Carrito">
                                Carrito
                                <span className="badge bg-secondary ms-2">
                                    {carritoProducto.length}
                                </span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <span className="nav-link">
                                {nombreUsuario}
                            </span>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}
