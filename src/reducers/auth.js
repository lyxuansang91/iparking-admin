import {combineReducers} from 'redux'
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGOUT_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS
} from '../actions/auth'

function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token')
        ? true
        : false
}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated,
                user: action.creds
            })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated,
                errorMessage: ''
            })
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated,
                errorMessage: action.message
            })
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated
            })
        default:
            return state
    }
}
