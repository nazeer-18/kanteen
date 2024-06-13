import axios from 'axios';

const serverUrl =  'https://kanteen-server.onrender.com';

class orderService{
    addOrder(userId,products,total,mode){ 
        return axios.post(serverUrl + '/api/orders/create', { userId,products,total,mode })
    }
    fetchOrders(userId){
        return axios.post(serverUrl + '/api/orders/fetchOrders', { userId })       
    }
    fetchPendingOrders(){
        return axios.get(serverUrl + '/api/orders/fetchPendingOrders')
    }
}

export default new orderService();