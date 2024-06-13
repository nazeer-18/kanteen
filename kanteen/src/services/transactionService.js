import axios from 'axios';
const serverUrl = 'https://kanteen-server.onrender.com';

class transactionService {
    getTransactions(userId) {
        return axios.post(serverUrl + '/api/transaction/fetch', { userId });
    }
    createTransaction(userId, orderId, paymentId, status ){ 
        return axios.post(serverUrl + '/api/transaction/create', { userId, orderId, paymentId, status });
    }
}

const newTransaction = new transactionService();

export default newTransaction;