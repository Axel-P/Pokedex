export interface IType {
    name: string
}

type evolution = { canEvolve: true, evolutionName: string } | { canEvolve: false, evolutionName?: never }

export interface IPokemon {
    id: number
    types: IType[]
    name: string
    order: number
    evolution?: evolution
}

export interface IStore {
    data?: IPokemon[]
}