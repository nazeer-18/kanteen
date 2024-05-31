import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL || 'https://kanteen-server.onrender.com';

class userService {
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
    //get all items in the menu
    getMenuItems() {
        return axios.get(serverUrl + '/api/items/fetchall')
    }
    //add an item to cart
    addToCart(userId, itemId, quantity) {
        return axios.post(serverUrl + '/api/cart/add', { userId, itemId, quantity })
    }
    //get all items from cart
    fetchCartItems(userId) {
        return axios.post(serverUrl + '/api/cart/fetchall', { userId })
    }
    //remove an item from cart
    removeFromCart(userId, itemId) {
        return axios.post(serverUrl + '/api/cart/remove', { userId, itemId })
    }
    //update quantity of an item in cart
    updateQty(userId, itemId, quantity) {
        return axios.post(serverUrl + '/api/cart/update', { userId, itemId, quantity })
    }
}
//eslint-disable-next-line
export default new userService();