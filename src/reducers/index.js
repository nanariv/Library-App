export default function reducer(state = {}, action) {
    if (action) {
        switch (action.type) {
            case 'add':
                return Object.assign({}, state, {books: action.books });
            default:
                return state;
        }
    }
}