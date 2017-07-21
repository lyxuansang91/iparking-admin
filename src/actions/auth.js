export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
    return {type: LOGIN_REQUEST, isFetching: true, isAuthenticated: false, creds}
}

function receiveLogin(user) {
    return {type: LOGIN_SUCCESS, isFetching: false, isAuthenticated: true, id_token: user.id_token}
}

function loginError(message) {
    return {type: LOGIN_FAILURE, isFetching: false, isAuthenticated: false, message}
}

export function loginUser(creds) {
    return (dispatch) => {
        dispatch(requestLogin(creds))
        axios
            .post(url)
            .then((response) => {
                const data = response.data;
                if (data.Message !== "") {
                    dispatch(loginError(data.Message))
                } else {
                    const user = data.Data;
                    localStorage.setItem('id_token', user.id_token)
                    localStorage.setItem('access_token', user.access_token)
                    dispatch(receiveLogin(user))
                }
            })
            .catch(err => {
                console.log("Error:", err)
            })
    }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
    return {type: LOGOUT_REQUEST, isFetching: true, isAuthenticated: true}
}

function receiveLogout() {
    return {type: LOGOUT_SUCCESS, isFetching: false, isAuthenticated: false}
}

function logoutError() {
    return {type: LOGIN_FAILURE, isFetching: false}
}

export function logoutUser() {
    return (dispatch) => {
        dispatch(requestLogout())
        localStorage.removeItem('id_token')
        localStorage.removeItem('access_token')
        dispatch(receiveLogout())
    }
}