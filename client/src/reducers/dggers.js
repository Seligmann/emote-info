export default (dggers = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [... dggers, action.payload];
        default:
            return dggers;
    }
}