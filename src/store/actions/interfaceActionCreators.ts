export enum Actions {
    RequestActivePage = 'REQUEST_ACTIVE_PAGE',
    SetActivePage = 'SET_ACTIVE_PAGE'
}

export type ActionTypes =
    { type: Actions.RequestActivePage, data: number } |
    { type: Actions.SetActivePage, data: number }

function requestActivePage(data: number) {
    return { type: Actions.RequestActivePage, data }
}

function setActivePage(data: number) {
    return { type: Actions.SetActivePage, data }
}

export const actionsGenerators = {
    activePage: {
        requestActivePage,
        setActivePage
    }
}