import axios from 'axios'
import qs from 'qs'
const apiConfig = {
    // baseUrl: 'https://admapi.iparking.vn'
    baseUrl: 'http://admapi.upark.vn'
}

export function setAuthorizationToken(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export function config() {
    axios.defaults.baseURL = apiConfig.baseUrl
    axios.defaults.responseType = 'json'
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.headers.common.post = {};
    axios.defaults.headers.common.put = {};
    axios.defaults.xsrfCookieName = '_CSRF';
    axios.defaults.xsrfHeaderName = 'CSRF';
}

export function postFromUrl(url, data) {
    return axios.post(url, qs.stringify(data))
}

export function getFromUrl(url, data) {
    return axios.get(url + qs.stringify(data))
}
