import axios from 'axios';
const serverUrl = process.env.REACT_APP_SERVER_URL;


class itemService {
    //get all items in the menu
    getMenuItems() {
        return axios.get(serverUrl + '/api/items/fetchall')

    }
    addToMenu(id,name,price,quantity,image,type,category){
        return axios.post(serverUrl + '/api/items/add',{id,name,price,quantity,image,type,category})
    }
    //add an item to cart
    addToCart(userId, itemId, quantity) {
        return axios.post(serverUrl + '/api/cart/add', { userId, itemId, quantity })
    }
    //get all items from cart
    fetchCartItems(userId) {
        return axios.post(serverUrl + '/api/cart/fetchall', { userId })
    }
    //get a single item data
    fetchItemData(itemId){
        return axios.post(serverUrl + '/api/items/fetchone', { itemId })
    }
    //remove an item from cart
    removeFromCart(userId, itemId) {
        return axios.post(serverUrl + '/api/cart/remove', { userId, itemId })
    }
    //update quantity of an item in cart
    updateQty(userId, itemId, quantity) {
        return axios.post(serverUrl + '/api/cart/update', { userId, itemId, quantity })
    }
    //modify an item in menu
    ModifyItem(id,name,price,quantity,image,type,category){
        return axios.post(serverUrl + '/api/items/modify',{id,name,price,quantity,image,type,category})
    }
    //remove an item from menu
    deleteItem(id){
        return axios.post(serverUrl + '/api/items/remove',{id}) 
    }
}

//eslint-disable-next-line
export default new itemService();