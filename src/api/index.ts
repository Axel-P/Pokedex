import axios from 'axios'

export function requestRecordLinks(recordId: string) {
    return axios.request({
        method: 'get',
        url: `https://pokeapi.co/api/v2/evolution-chain/${recordId}`
    })
}

export function requestRecord(recordName: string) {
    return axios.request({
        method: 'get',
        url: `https://pokeapi.co/api/v2/pokemon/${recordName}`
    })
}

export function requestData(offset: number) {
    return axios.request({
        method: 'get',
        url: `https://pokeapi.co/api/v2/pokemon?limit=${process.env.REACT_APP_PAGE_SIZE}&offset=${offset}`
    })
}