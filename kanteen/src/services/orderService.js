import axios from 'axios';

const serverUrl = 'https://kanteen-server.onrender.com';

class orderService{
    addOrder(userId,orderId,products,total,mode){
        return axios.post(serverUrl + '/api/orders/create', { userId,orderId,products,total,mode })
    }
    fetchOrders(userId){
        return axios.post(serverUrl + '/api/orders/fetchOrders', { userId })       
    }
}

export default new orderService();