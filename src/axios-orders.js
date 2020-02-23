import axios from 'axios'


const instance = axios.create({
    baseURL:'https://my-first-app-684db.firebaseio.com/'

})


export default instance