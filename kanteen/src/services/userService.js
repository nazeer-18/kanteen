import axios from 'axios';

const serverUrl = process.env.SERVER_URL || 'http://localhost:8080';

class userService{
    checkMail(email){
        return axios.post(serverUrl + '/api/verify/mail',{emailId:email})
    }
}

export default new userService();