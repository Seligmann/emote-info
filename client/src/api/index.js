import axios from 'axios';

const url = 'https://zelig.dev/dggers';

export const fetchDggers = () => axios.get(url);
export const createDgger = (newDgger) => axios.post(url, newDgger);
