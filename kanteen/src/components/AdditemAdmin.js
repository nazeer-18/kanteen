
import React, { useState } from 'react';
 import '../styles/AdditemAdmin.css';

export default function AddItemAdmin() {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const categories = ['beverages', 'starters', 'main course', 'desserts', 'stationery', 'snacks', 'tiffin'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { itemName, quantity, imageUrl, price, category };
    console.log('New Item:', newItem);
  };

  return (
    
    <div className='cntnr'>
        
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Item Name :</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
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
          <label>Image URL :</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
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
