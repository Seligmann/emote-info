import axios from 'axios';

const url = 'http://localhost:5000/dggers';

export const fetchDggers = () => axios.get(url);