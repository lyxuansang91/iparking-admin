import axios from 'axios'

export function itemsHasErrored(bool) {
    return {type: 'ITEMS_HAS_ERRORED', hasErrored: bool};
}

export function itemsIsLoading(bool) {
    return {type: 'ITEMS_IS_LOADING', isLoading: bool};
}

export function itemsFetchDataSuccess(items) {
    return {type: 'ITEMS_FETCH_DATA_SUCCESS', items};
}

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        axios
            .get(url)
            .then((response) => {
                const data = response.data;
                dispatch(itemsIsLoading(false))
                dispatch(itemsFetchDataSuccess(data))
            })
            .catch((error) => {
                dispatch(itemsIsLoading(false))
                dispatch(itemsHasErrored(true))
            })
    };
}