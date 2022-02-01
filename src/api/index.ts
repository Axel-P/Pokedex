import axios from 'axios'

export function requestRecordLinks(recordId: string) {
    return axios.request({
        method: 'get',
        url: `${process.env.REACT_APP_API}/evolution-chain/${recordId}`
    })
}

export function requestRecord(recordName: string) {
    return axios.request({
        method: 'get',
        url: `${process.env.REACT_APP_API}/pokemon/${recordName}`
    })
}

export function requestData(offset: number) {
    return axios.request({
        method: 'get',
        url: `${process.env.REACT_APP_API}/pokemon?limit=${process.env.REACT_APP_PAGE_SIZE}&offset=${offset}`
    })
}