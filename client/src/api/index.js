import axios from 'axios';

const url = 'http://localhost:5000/dggers';

export const fetchDggers = () => axios.get(url);
export const createDgger = (newDgger) => axios.post(url, newDgger);