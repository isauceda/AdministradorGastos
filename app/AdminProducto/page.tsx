
'use client'

import React, { useState } from 'react'
import { Producto } from '../modelos/Producto'
import { useContextProducto } from '../Provider/ProviderProducto'

const URL = 'http://localhost:5000/producto'

export default function AdminProducto() {

    const { producto: productos, actualizarProductos } = useContextProducto()

    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [isv, setIsv] = useState('')
    const [imagen, setImagen] = useState('')
    const [idEditar, setIdEditar] = useState<number | null>(null)

    // Limpiar formulario
    function limpiarFormulario() {
        setNombre('')
        setPrecio('')
        setIsv('')
        setImagen('')
        setIdEditar(null)
    }

    // Guardar o actualizar producto
    async function guardarProducto(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const nuevoProducto = {
            nombreProducto: nombre,
            precioProducto: Number(precio),
            isvProducto: Number(isv),
            imgProducto: imagen
        }

        try {
            const respuesta = await fetch(
                idEditar !== null ? `${URL}/${idEditar}` : URL,
                {
                    method: idEditar !== null ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevoProducto)
                }
            )

            const datos = await respuesta.json()

            if (respuesta.ok) {
                alert(idEditar !== null
                    ? 'Producto actualizado correctamente'
                    : 'Producto agregado correctamente')

                limpiarFormulario()
                await actualizarProductos()

            } else {
                alert(datos.mensaje || datos.error || 'No se pudo guardar el producto')
            }

        } catch (error) {
            console.log('Error al guardar:', error)
            alert('No se pudo conectar con el servidor')
        }
    }

    // Seleccionar producto para editar
    function editarProducto(producto: Producto) {
        setIdEditar(producto.idProducto)
        setNombre(producto.nombreProducto)
        setPrecio(String(producto.precioProducto))
        setIsv(String(producto.isvProducto))
        setImagen(producto.imgProducto || '')

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    // Eliminar producto
    async function eliminarProducto(id: number) {
        if (!window.confirm('¿Deseas eliminar este producto?')) {
            return
        }

        try {
            const respuesta = await fetch(`${URL}/${id}`, {
                method: 'DELETE'
            })

            const datos = await respuesta.json()

            if (respuesta.ok) {
                alert('Producto eliminado correctamente')
                await actualizarProductos()
                limpiarFormulario()

            } else {
                alert(datos.mensaje || 'No se pudo eliminar el producto')
            }

        } catch (error) {
            console.log('Error al eliminar:', error)
        }
    }

    return (
        <div className="container mt-4 mb-5">

            <h2 className="mb-4">Administración de productos</h2>

            <div className="card mb-4">
                <div className="card-header">
                    {idEditar !== null ? 'Editar producto' : 'Agregar producto'}
                </div>

                <div className="card-body">
                    <form onSubmit={guardarProducto}>

                        <div className="mb-3">
                            <label className="form-label">
                                Nombre del producto
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Precio</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">ISV</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    value={isv}
                                    onChange={(e) => setIsv(e.target.value)}
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Imagen del producto (URL)
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={imagen}
                                onChange={(e) => setImagen(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-success me-2">
                            {idEditar !== null ? 'Actualizar' : 'Guardar producto'}
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

            <h3 className="mb-3">Productos registrados</h3>

            <div className="table-responsive">
                <table className="table table-bordered table-striped">

                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>ISV</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productos.length > 0 ? (
                            productos.map((producto) => (
                                <tr key={producto.idProducto}>
                                    <td>{producto.idProducto}</td>
                                    <td>{producto.nombreProducto}</td>
                                    <td>L. {Number(producto.precioProducto).toFixed(2)}</td>
                                    <td>L. {Number(producto.isvProducto).toFixed(2)}</td>

                                    <td>
                                        {producto.imgProducto ? (
                                            <img
                                                src={producto.imgProducto}
                                                alt={producto.nombreProducto}
                                                width="60"
                                            />
                                        ) : 'Sin imagen'}
                                    </td>

                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => editarProducto(producto)}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => eliminarProducto(producto.idProducto)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center">
                                    No hay productos registrados
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

        </div>
    )
}

