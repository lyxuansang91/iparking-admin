import axios from 'axios'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export function isLoginLoading(state = false, action) {
    switch (action.type) {
        case 'IS_LOGIN_LOADING':
            return action.isLoginLoading;
        default:
            return state;
    }
}

export function isLoginFail(state = false, action) {
    switch (action.type) {
        case 'IS_LOGIN_FAIL':
            return action.isLoginFail;
        default:
            return state;
    }
}

export function isAuthenticated(state = false, action) {
    switch (action.type) {
        case 'IS_AUTHENTICATED':
            return action.isAuthenticated;
        default:
            return state;
    }
}