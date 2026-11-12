
'use client'

import React, { useState } from 'react'
import { Gasto } from '../modelos/Gasto'
import { useContextGasto } from '../Provider/ProviderGasto'

const URL = 'http://localhost:5000/gasto'

export default function AdminGasto() {

    const { gasto, presupuesto, agregarGasto, eliminarGasto, actualizarGasto } = useContextGasto()

    const [categoria, setCategoria] = useState('')
    const [nuevaCategoria, setNuevaCategoria] = useState('')
    const [categorias, setCategorias] = useState([
        'Comida',
        'Transporte',
        'Entretenimiento',
        'Otros'
    ])
    const [monto, setMonto] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fecha, setFecha] = useState('')
    const [idEditar, setIdEditar] = useState<number | null>(null)

    function agregarCategoria() {
        if (nuevaCategoria.trim() !== '') {
            if (!categorias.includes(nuevaCategoria.trim())) {
                setCategorias([...categorias, nuevaCategoria.trim()])
            }
            setCategoria(nuevaCategoria.trim())
            setNuevaCategoria('')
        }
    }

    function limpiarFormulario() {
        setCategoria('')
        setMonto('')
        setDescripcion('')
        setFecha('')
        setIdEditar(null)
    }

    async function guardarGasto(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const nuevoGasto = {
            categoria,
            monto,
            descripcion,
            fecha
        }

        try {
            if (idEditar !== null) {
                const respuesta = await fetch(`${URL}/${idEditar}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevoGasto)
                })

                if (respuesta.ok) {
                    alert('Gasto actualizado correctamente')
                    limpiarFormulario()
                    await actualizarGasto()
                } else {
                    alert('No se pudo actualizar el gasto')
                }
            } else {
                await agregarGasto(nuevoGasto)
                limpiarFormulario()
            }
        } catch (error) {
            console.log('Error al guardar gasto:', error)
        }
    }

    function editarGasto(gasto: Gasto) {
        setIdEditar(gasto.idgasto)
        setCategoria(gasto.categoria)
        setMonto(gasto.monto)
        setDescripcion(gasto.descripcion)
        setFecha(gasto.fecha.substring(0, 10))

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    async function eliminarRegistro(id: number) {
        if (window.confirm('¿Deseas eliminar este gasto?')) {
            await eliminarGasto(id)
        }
    }

    return (
        <div className="container mt-4 mb-5">

            <h2 className="mb-4">Registro de gastos</h2>

            <div className="card mb-4">
                <div className="card-body">
                    <h5>Presupuesto mensual establecido</h5>
                    <h3>L. {presupuesto.toFixed(2)}</h3>
                </div>
            </div>

            <div className="card mb-4">
                <div className="card-header">
                    {idEditar !== null ? 'Editar gasto' : 'Agregar gasto'}
                </div>

                <div className="card-body">
                    <form onSubmit={guardarGasto}>

                        <div className="mb-3">
                            <label className="form-label">Categoría</label>

                            <select
                                className="form-select"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                required
                            >
                                <option value="">Seleccione una categoría</option>

                                {categorias.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Agregar nueva categoría</label>

                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Escriba una categoría"
                                    value={nuevaCategoria}
                                    onChange={(e) => setNuevaCategoria(e.target.value)}
                                />

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={agregarCategoria}
                                >
                                    Agregar
                                </button>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Monto (Lps.)</label>

                            <input
                                type="number"
                                className="form-control"
                                value={monto}
                                onChange={(e) => setMonto(e.target.value)}
                                min="0.01"
                                step="0.01"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Descripción</label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Descripción breve del gasto"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Fecha de registro</label>

                            <input
                                type="date"
                                className="form-control"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-success me-2">
                            {idEditar !== null ? 'Actualizar gasto' : 'Guardar gasto'}
                        </button>

                        {idEditar !== null && (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={limpiarFormulario}
                            >
                                Cancelar
                            </button>
                        )}

                    </form>
                </div>
            </div>

            <h3 className="mb-3">Gastos registrados</h3>

            <div className="table-responsive">
                <table className="table table-bordered table-striped">

                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Categoría</th>
                            <th>Descripción</th>
                            <th>Monto</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {gasto.length > 0 ? (
                            gasto.map((item) => (
                                <tr key={item.idgasto}>
                                    <td>{item.idgasto}</td>
                                    <td>{item.categoria}</td>
                                    <td>{item.descripcion}</td>
                                    <td>L. {Number(item.monto).toFixed(2)}</td>
                                    <td>{item.fecha.substring(0, 10)}</td>

                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => editarGasto(item)}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => eliminarRegistro(item.idgasto)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center">
                                    No hay gastos registrados
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

        </div>
    )
}


