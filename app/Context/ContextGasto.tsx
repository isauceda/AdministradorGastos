
import { createContext } from "react";
import { Gasto } from "../modelos/Gasto";


export const ContextGasto = createContext({
    gasto: [] as Gasto[],
    presupuesto: 0,
    totalGastos: 0,
    actualizarGasto: async () => {},
    agregarGasto: (gasto: Omit<Gasto, 'idgasto'>) => {},
    eliminarGasto: (idgasto: number) => {},
    actualizarPresupuesto: (presupuesto: number) => {},
    });

