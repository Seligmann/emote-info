import axios from 'axios';

const url = 'https://www.zelig.dev/dggers';

export const fetchDggers = () => axios.get(url);
export const createDgger = (newDgger) => axios.post(url, newDgger);
