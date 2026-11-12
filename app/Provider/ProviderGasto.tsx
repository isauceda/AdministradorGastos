
'use client'

import React, { useContext, useEffect, useState } from 'react'
import { Plantilla } from '../modelos/Plantilla'
import { Gasto } from '../modelos/Gasto'
import { ContextGasto } from '../Context/ContextGasto'

const URL = 'http://localhost:5000'

export default function ProviderGasto({ children }: Plantilla) {

    const [gasto, setGastos] = useState<Gasto[]>([])
    const [presupuesto, setPresupuesto] = useState(0)

    const [ordenCompra, setOrdenCompra] = useState(0)
    useEffect(() => {
    setOrdenCompra(Math.floor(Date.now() / 1000))
}, [])

    // Cargar gasto desde PostgreSQL
    async function actualizarGasto() {
        try {
            const respuesta = await fetch(`${URL}/gasto`)
            const datos = await respuesta.json()

            if (respuesta.ok) {
                setGastos(datos)
            }else {
                setGastos([])
            }

        } catch (error) {
            console.log('Error al cargar gastos:', error)
        }
    }

  
    // Registrar un gasto
    async function agregarGasto(gasto: Omit<Gasto, 'idgasto'>) {
        try {
            const respuesta = await fetch(`${URL}/gasto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gasto)
            })

            if (respuesta.ok) {
                alert('Gasto agregado correctamente')
                actualizarGasto()
            } else {
                alert('No se pudo agregar el gasto')
            }

        } catch (error) {
            console.log('Error al agregar gasto:', error)
        }
    }

    // eliminar gasto
    async function eliminarGasto(idgasto: number) {
        try {
            const respuesta = await fetch(`${URL}/gasto/${idgasto}`)
            const datos = await respuesta.json()

            if (respuesta.ok) {
              alert ('Gasto eliminado')
                    actualizarGasto()
    }
        } catch (error) {
            console.log('Error al eliminar gasto:', error)
        }
    }

    // Calcular total de gastos
    const totalGastos = gasto.reduce(
        (total, gasto) => total + Number(gasto.monto),
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

