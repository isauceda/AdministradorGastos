
'use client'

import React, { useState } from 'react'
import { useContextGasto } from '../Provider/ProviderGasto'

export default function PresupuestoMensual() {

    const { presupuesto, totalGastos, actualizarPresupuesto } = useContextGasto()

    const [valor, setValor] = useState('')

    function guardarPresupuesto() {

        const cantidad = Number(valor)

        if (valor === '' || cantidad <= 0) {
            alert('Ingresa un presupuesto válido')
            return
        }

        actualizarPresupuesto(cantidad)
        setValor('')
    }

    const porcentaje = presupuesto > 0
        ? (totalGastos / presupuesto) * 100
        : 0

    return (
        <div className="container mt-4">
            <div className="card p-4 shadow-sm">

                <h3>Presupuesto mensual</h3>

                <label className="form-label mt-3">
                    Establecer presupuesto
                </label>

                <input
                    type="number"
                    className="form-control"
                    placeholder="Ingrese su presupuesto mensual"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                />

                <button
                    className="btn btn-primary mt-3"
                    onClick={guardarPresupuesto}
                >
                    Guardar presupuesto
                </button>

                <hr />

                <h5>Presupuesto establecido:</h5>

                <h3>L. {presupuesto.toFixed(2)}</h3>

                <p>Total gastado: L. {totalGastos.toFixed(2)}</p>

                <p>Porcentaje utilizado: {porcentaje.toFixed(2)}%</p>

                {presupuesto > 0 && porcentaje > 100 && (
                    <div className="alert alert-danger mt-2">
                        Has superado el límite del presupuesto, debes ajustar gastos
                    </div>
                )}

                {presupuesto > 0 && porcentaje >= 80 && porcentaje <= 100 && (
                    <div className="alert alert-warning mt-2">
                        ¡Atención! Has alcanzado el 80% de tu presupuesto mensual.
                    </div>
                )}

            </div>
        </div>
    )
}
