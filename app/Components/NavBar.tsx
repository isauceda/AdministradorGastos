
'use client'

import Link from 'next/link'

export default function NavBar() {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">

                <Link className="navbar-brand" href="/">
                    Administrador de Gastos
                </Link>

                <div id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link className="nav-link" href="/">
                                Inicio
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="/Producto">
                                Gastos registrados
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}

