
'use client'

import React, { useContext, useEffect, useState } from 'react'
import { Gasto } from '../modelos/Gasto'
import { ContextGasto } from '../Context/ContextGasto'
import { Plantilla } from '../modelos/Plantilla'

const URL = 'http://localhost:5000'

export default function ProviderGasto({ children }: Plantilla) {

    const [gasto, setGastos] = useState<Gasto[]>([])
    const [presupuesto, setPresupuesto] = useState(0)

    // Cargar gastos
    async function actualizarGasto() {
        try {
            const respuesta = await fetch(`${URL}/gasto`)

            if (respuesta.ok) {
                const datos = await respuesta.json()
                setGastos(datos)
            } else {
                console.log('Error al cargar gastos')
            }

        } catch (error) {
            console.log('Error al cargar gastos:', error)
        }
    }

    // Agregar gasto
    async function agregarGasto(gastoNuevo: Omit<Gasto, 'idgasto'>) {
        try {
            const respuesta = await fetch(`${URL}/gasto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gastoNuevo)
            })

            if (respuesta.ok) {
                alert('Gasto agregado correctamente')
                await actualizarGasto()
            } else {
                alert('No se pudo agregar el gasto')
            }

        } catch (error) {
            console.log('Error al agregar gasto:', error)
        }
    }

    // Eliminar gasto
    async function eliminarGasto(idgasto: number) {
        try {
            const respuesta = await fetch(`${URL}/gasto/${idgasto}`, {
                method: 'DELETE'
            })

            if (respuesta.ok) {
                alert('Gasto eliminado correctamente')
                await actualizarGasto()
            } else {
                alert('No se pudo eliminar el gasto')
            }

        } catch (error) {
            console.log('Error al eliminar gasto:', error)
        }
    }

    // Calcular total de gastos
    const totalGastos = gasto.reduce(
        (total, item) => total + Number(item.monto),
        0
    )

    // Actualizar presupuesto
    function actualizarPresupuesto(valor: number) {
        setPresupuesto(valor)
    }

    useEffect(() => {
        actualizarGasto()
    }, [])

    return (
        <ContextGasto.Provider value={{
            gasto,
            presupuesto,
            totalGastos,
            actualizarGasto,
            agregarGasto,
            eliminarGasto,
            actualizarPresupuesto
        }}>
            {children}
        </ContextGasto.Provider>
    )
}

export function useContextGasto() {
    return useContext(ContextGasto)
}

