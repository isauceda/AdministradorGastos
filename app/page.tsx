
'use client'

import { useState } from 'react'
import CardGasto from '@/app/Components/CardGasto'
import PresupuestoMensual from '@/app/Components/PresupuestoMensual'

export default function Page() {

    const [usuario, setUsuario] = useState('')
    const [clave, setClave] = useState('')
    const [sesionIniciada, setSesionIniciada] = useState(false)
    const [mensaje, setMensaje] = useState('')

    const iniciarSesion = (e: React.FormEvent<HTMLFormElement>) => {
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
                        Mis Gastos / Inicio de Sesión
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

            <PresupuestoMensual />

            <h3 className="mt-5 mb-4">
                Gastos registrados
            </h3>

            <CardGasto />

        </div>
    )
}

