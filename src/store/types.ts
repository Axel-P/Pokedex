export interface IType {
    type: {
        name: string
    }
}

type evolution = { canEvolve: true, evolutionName: string } | { canEvolve: false, evolutionName?: never }

export interface IPokemon {
    id: number
    types: IType[]
    name: string
    order: number
    evolution?: evolution
    sprites: {
        front_default: string
    }
}

export interface IStore {
    data?: IPokemon[]
    interface?: {
        pagination: {
            active: number
        },
        spotlight: {
            activeRecordIndex?: number
        }
    }
}