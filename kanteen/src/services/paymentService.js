import axios from 'axios';
const serverUrl = process.env.REACT_APP_SERVER_URL;

class paymentService {
    //proceed to checkout once user clicks on checout in cart page
    paymentRequest(orderId, orderAmount, customerId, customerName, customerNumber, customerMail) {
        return axios.post(serverUrl + '/api/payment/checkout', { orderId, orderAmount, customerId, customerName, customerNumber, customerMail })
    }
    paymentStatus(orderId){
        return axios.post(serverUrl + '/api/payment/status', { orderId })
    }
    checkUserAuth(orderId, alphanumericId){
        return axios.post(serverUrl + '/api/orders/validateUserOrder', { orderId, alphanumericId })
    }
}

//eslint-disable-next-line
export default new paymentService();