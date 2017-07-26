import {combineReducers} from 'redux'
import {items, itemsHasErrored, itemsIsLoading} from './items'
import {auth} from './auth'

const allReducers = combineReducers({auth, items, itemsHasErrored, itemsIsLoading});

export default allReducers