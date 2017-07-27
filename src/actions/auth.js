import qs from 'qs'
import axios from 'axios'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
import {setAuthorizationToken, postFromUrl} from './apiUtils'

function requestLogin(creds) {
    return {type: LOGIN_REQUEST, isFetching: true, isAuthenticated: false, creds}
}

function receiveLogin(token) {
    return {type: LOGIN_SUCCESS, isFetching: false, isAuthenticated: true, accessToken: token}
}

function loginError(message) {
    return {type: LOGIN_FAILURE, isFetching: false, isAuthenticated: false, message}
}

export function loginUser(creds) {
    return (dispatch) => {
        dispatch(requestLogin(creds))
        postFromUrl("/p/login", creds).then((response) => {
            const data = response.data;
            console.log("login data:", data)
            if (data.Error.Code !== 200) {
                dispatch(loginError(data.Error.Message))
            } else {
                const token = data.Data;
                localStorage.setItem('accessToken', token)
                dispatch(receiveLogin(token))
            }
        }).catch(err => {
            console.log("Error:", err)
        })
    }
}

export function saveCreds(token) {
    return (dispatch) => {
        setAuthorizationToken(token)
    }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

function requestLogout() {
    return {type: LOGOUT_REQUEST, isFetching: true, isAuthenticated: true}
}

function receiveLogout() {
    return {type: LOGOUT_SUCCESS, isFetching: false, isAuthenticated: false}
}

export function logoutUser() {
    return (dispatch) => {
        dispatch(requestLogout())
        localStorage.removeItem('accessToken')
        dispatch(receiveLogout())
    }
}