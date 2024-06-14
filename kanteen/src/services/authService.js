import axios from 'axios';

const serverUrl = 'https://kanteen-server.onrender.com';

class authService {
    //whether a email is already registered or not
    checkMail(emailId) {
        return axios.post(serverUrl + '/api/verify/mail', { emailId })
    }
    //verify the email address and login
    login(userId, password) {
        return axios.post(serverUrl + '/api/auth/login', { userId, password })
    }
    //register a new user
    register(emailId, name, mobileNumber, password) {
        return axios.post(serverUrl + '/api/auth/signup', { emailId, name, mobileNumber, password })
    }
    //verify mail for forgot password
    verifyForgotMail(emailId) {
        return axios.post(serverUrl + '/api/verify/forgot-mail', { emailId })
    }
    //update password
    updatePassword(emailId, password) {
        return axios.put(serverUrl + '/api/verify/update-password', { emailId, password })
    }
    //resend otp mail
    resendotpmail(emailId) {
        return axios.post(serverUrl + '/api/verify/resend-mail', { emailId })
    }
    updateUser(emailId, name, mobileNumber) {
        return axios.put(serverUrl + '/api/verify/update', { emailId, name, mobileNumber })
    }
}

//eslint-disable-next-line
export default new authService();