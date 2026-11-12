
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUsuario } from '../Provider/ProviderUsuario'

export default function LoginComponent() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mensaje, setMensaje] = useState('')

    const { setNombreUsuario } = useUsuario()
    const router = useRouter()

    function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (email === 'admin' && password === 'admin123') {
            setNombreUsuario(email)
            setMensaje('')
            router.push('/Producto')
        } else {
            setMensaje('Usuario o contraseña incorrectos')
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow p-4" style={{ width: '400px' }}>

                <h3 className="text-center mb-4">
                    Administrador de Gastos
                </h3>

                <form onSubmit={login}>

                    <div className="mb-3">
                        <label className="form-label">Usuario</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ingrese su usuario"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Ingrese su contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {mensaje && (
                        <div className="alert alert-danger">
                            {mensaje}
                        </div>
                    )}

                    <button type="submit" className="btn btn-dark w-100">
                        Iniciar sesión
                    </button>

                </form>
            </div>
        </div>
    )
}

