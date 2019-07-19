import { createStore } from 'redux';
import reducer from '../reducers';

const initialState = {
    books: null
};
//initialState = reducer;
export const store = createStore(reducer, initialState);