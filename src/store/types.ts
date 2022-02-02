export interface IType {
    type: {
        name: string
    }
}

type evolutionTree =
    { hasEvolutionTree: true, previousStageName?: string, nextStageName?: string } |
    { hasEvolutionTree: false, previousStageName?: never, nextStageName?: never }

export interface IPokemon {
    id: number
    types: IType[]
    name: string
    order: number
    evolutionTree?: evolutionTree
    sprites: {
        front_default: string
    }
}

export interface IStore {
    data?: IPokemon[]
    interface?: {
        pagination: {
            active: number,
            loading: boolean
        },
        spotlight: {
            activeRecord?: IPokemon
        }
    }
}