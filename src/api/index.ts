import axios from 'axios';

export function requestData() {
    return axios.request({
      method: 'get',
      url: 'https://pokeapi.co/api/v2/pokemon',
      data: {
        limit: 150,
        offset: 0
      }
    })
  }