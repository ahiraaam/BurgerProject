import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerapp-react-d03c0.firebaseio.com/'
})

export default instance;