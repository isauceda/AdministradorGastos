
'use client'

import { useState } from 'react'
import CardProducto from '@/app/Components/CardProducto'
import { useContextProducto } from '@/app/Provider/ProviderProducto'

export default function Page() {

    const { producto } = useContextProducto()

    const [usuario, setUsuario] = useState('')
    const [clave, setClave] = useState('')
    const [sesionIniciada, setSesionIniciada] = useState(false)
    const [mensaje, setMensaje] = useState('')

    const iniciarSesion = (e: React.FormEvent) => {
        e.preventDefault()

        if (usuario === 'admin' && clave === 'admin123') {
            setSesionIniciada(true)
            setMensaje('')
        } else {
            setMensaje('Usuario o contraseña incorrectos')
        }
    }

    if (!sesionIniciada) {
        return (
            <div className="container d-flex justify-content-center align-items-center min-vh-100">

                <div className="card shadow p-4" style={{ width: '400px' }}>

                    <h2 className="text-center mb-4">
                        Mis Gastos/Inicio de Sesion
                    </h2>

                    <form onSubmit={iniciarSesion}>

                        <div className="mb-3">
                            <label className="form-label">Usuario</label>
                            <input
                                type="text"
                                className="form-control"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                placeholder="Usuario"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                value={clave}
                                onChange={(e) => setClave(e.target.value)}
                                placeholder="Clave"
                                required
                            />
                        </div>

                        {mensaje && (
                            <div className="alert alert-danger">
                                {mensaje}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary w-100">
                            Iniciar sesión
                        </button>

                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="container mt-4">

            <h2 className="mb-4">
                Administrador de Gastos Personales
            </h2>

            <div className="row">
                {producto.map((item, index) => (
                    <div
                        className="col-md-4 mb-3"
                        key={`${item.idProducto}-${index}`}
                    >
                        <CardProducto {...item} />
                    </div>
                ))}
            </div>

        </div>
    )
}

