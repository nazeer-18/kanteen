import axios from 'axios';

const serverUrl = 'https://kanteen-server.onrender.com';

class orderService{
    addOrder(userId,products,total,mode){
        return axios.post(serverUrl + '/api/orders/create', { userId,products,total,mode })
    }
}

export default new orderService();