export default (dggers = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return dggers;
        default:
            return dggers;
    }
}