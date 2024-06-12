import axios from 'axios';
const serverUrl =  'https://kanteen-server.onrender.com';

class paymentService {
    //proceed to checkout once user clicks on checout in cart page
    paymentRequest(orderId, orderAmount, customerId, customerName, customerNumber) {
        return axios.post(serverUrl + '/api/payment/checkout', { orderId, orderAmount, customerId, customerName, customerNumber })
    }
}

//eslint-disable-next-line
export default new paymentService();