
'use client'

import React from 'react'
import { useContextGasto } from '../Provider/ProviderGasto'

export default function CardGasto() {

    const { gasto, eliminarGasto } = useContextGasto()

    return (
        <div className="row">
            {gasto.map((gasto) => (
                <div className="col-md-4 mb-3" key={gasto.idgasto}>
                    <div className="card">
                        <div className="card-header">
                            {gasto.categoria}
                        </div>

                        <div className="card-body">
                            <p>Monto: Lps. {gasto.monto}</p>
                            <p>Fecha: {gasto.fecha}</p>
                        </div>

                        <div className="card-footer">
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => eliminarGasto(gasto.idgasto)}
                            >
                                Eliminar gasto
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}


