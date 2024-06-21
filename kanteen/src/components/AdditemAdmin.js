
import React, { useState } from 'react';
import itemService from '../services/itemService';
 import '../styles/AdditemAdmin.css';

export default function AddItemAdmin() {
  const [name, setName] = useState('');
  const [id, setId]=useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType]=useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const categories = ['beverages', 'starters', 'main course', 'desserts', 'stationery', 'snacks', 'tiffin'];

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await itemService.addToMenu(id,name,price,quantity,image,type,category);
      console.log(response.data)
    }
    catch(err){
      console.log(err);
    }
  };

  return (
    
    <div className='AdditemAdmin'>

        
      
      <form onSubmit={handleSubmit}>
      <div>
          <label>Id:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Item Name :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantity :</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Type :</label>
          <select
            type="number"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            
          ><option value="" disabled>Select Type</option>
          
            <option value='veg'>veg</option>
            <option value='non-veg'>non-veg</option>
            <option value='others'>others</option>
          </select>
        </div>
        <div>
          <label>Image URL :</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price :</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category :</label>
          <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
        </div>
        <button className='AdditemAdmin-button' type="submit">Add item</button>
      </form>
    </div>
    
  );
}
