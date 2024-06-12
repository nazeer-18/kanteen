import axios from 'axios';
const serverUrl = 'https://kanteen-server.onrender.com';

class transactionService {
    getTransactions(userId) {
        return axios.post(serverUrl + '/api/transaction/fetch', { userId });
    }
}

const newTransaction = new transactionService();

export default newTransaction;