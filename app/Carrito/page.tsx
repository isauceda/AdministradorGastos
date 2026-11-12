
'use client'

import CardProducto from '@/app/Components/CardProducto'
import { useContextProducto } from '@/app/Provider/ProviderProducto'

export default function Page() {
    const { carritoProducto, pagarCarrito } = useContextProducto()

    async function pagar() {
        const total = await pagarCarrito()
        if (total > 0) {
            alert(`Total de la compra: L ${total.toFixed(2)}`)
        }
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Mi carrito</h2>

            <div className="row">
                {carritoProducto.map((producto) => (
                    <div className="col-md-4 mb-3" key={producto.idcarrito}>
                        <CardProducto
                            {...producto}
                            esCarrito={true}
                        />
                    </div>
                ))}
            </div>

            {carritoProducto.length > 0 && (
                <button className="btn btn-success mt-3" onClick={pagar}>
                    Pagar
                </button>
            )}

            {carritoProducto.length === 0 && (
                <p>No hay productos en el carrito.</p>
            )}
        </div>
    )
}

