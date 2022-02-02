import { IPokemon } from "../types"

export enum Actions {
    RequestActivePage = 'REQUEST_ACTIVE_PAGE',
    SetActivePage = 'SET_ACTIVE_PAGE',
    RequestSpotlight = 'REQUEST_SPOTLIGHT',
    RequestSpotlightSuccess = 'REQUEST_SPOTLIGHT_SUCCESS',
    RequestSpotlightFailure = 'REQUEST_SPOTLIGHT_FAILURE'
}

export type ActionTypes =
    { type: Actions.RequestActivePage, data: number } |
    { type: Actions.SetActivePage, data: number } |
    { type: Actions.RequestSpotlight, data?: string } |
    { type: Actions.RequestSpotlightSuccess, data?: IPokemon } |
    { type: Actions.RequestSpotlightFailure, error: unknown }

function requestActivePage(data: number) {
    return { type: Actions.RequestActivePage, data }
}

function setActivePage(data: number) {
    return { type: Actions.SetActivePage, data }
}

function requestSpotlight(data?: string) {
    return { type: Actions.RequestSpotlight, data }
}

function requestSpotlightSuccess(data?: IPokemon) {
    return { type: Actions.RequestSpotlightSuccess, data }
}

function requestSpotlightFailure(error: unknown) {
    return { type: Actions.RequestSpotlightFailure, error }
}

export const actionsGenerators = {
    activePage: {
        requestActivePage,
        setActivePage
    },
    spotlight: {
        requestSpotlight,
        requestSpotlightSuccess,
        requestSpotlightFailure
    }
}