import axios from 'axios';
const serverUrl = process.env.REACT_APP_SERVER_URL;

class orderService{
    addOrder(userId,products,total,mode){ 
        return axios.post(serverUrl + '/api/orders/create', { userId,products,total,mode })
    }
    fetchOrder(orderId){
        return axios.post(serverUrl + '/api/orders/fetchOrder', { orderId})
    }
    fetchOrders(userId){
        return axios.post(serverUrl + '/api/orders/fetchOrders', { userId })       
    }
    fetchPendingOrders(){
        return axios.get(serverUrl + '/api/orders/fetchPendingOrders')
    }
}

export default new orderService();