import axios from 'axios';

const serverUrl = process.env.SERVER_URL || 'http://localhost:8080';

class userService {
    checkMail(emailId) {
        return axios.post(serverUrl + '/api/verify/mail', { emailId })
    }
    login(userId, password ) {
        return axios.post(serverUrl + '/api/auth/login', { userId, password })
    }
    
}

export default new userService();