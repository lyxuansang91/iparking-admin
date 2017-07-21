import {combineReducers} from 'redux'
import {items, itemsHasErrored, itemsIsLoading} from './items'

const allReducers = combineReducers({items, itemsHasErrored, itemsIsLoading});

export default allReducers