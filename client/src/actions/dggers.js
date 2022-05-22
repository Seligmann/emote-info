import * as api from '../api';

// Action Creators
// Functions that return actions
export const getDggers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchDggers();

        dispatch({ type: 'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}