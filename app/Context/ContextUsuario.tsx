
import { createContext } from 'react'

interface UsuarioContextType {
    nombreUsuario: string
    setNombreUsuario: (nombre: string) => void
}

export const ContextUsuario = createContext<UsuarioContextType>({
    nombreUsuario: '',
    setNombreUsuario: () => {}
})
