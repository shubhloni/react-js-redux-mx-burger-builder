import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-8a6ab-default-rtdb.firebaseio.com/'
});

export default instance;