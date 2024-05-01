import axios from 'axios';

const serverUrl = process.env.SERVER_URL || 'http://localhost:8080';

class userService {
    //whether a email is already registered or not
    checkMail(emailId) {
        return axios.post(serverUrl + '/api/verify/mail', { emailId })
    }
    //verify the email address and login
    login(userId, password) {
        return axios.post(serverUrl + '/api/auth/login', { userId, password })
    }
}
//eslint-disable-next-line
export default new userService();