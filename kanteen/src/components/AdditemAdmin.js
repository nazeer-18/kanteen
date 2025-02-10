import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import itemService from '../services/itemService';
import ordersImg from '../images/Additem.svg';
import '../styles/AdditemAdmin.css';

export default function AddItemAdmin() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const { user, checkLocalData } = useUser();
  const [totalItems, setTotalItems] = useState(0);

  const categories = ['beverages', 'starters', 'main course', 'desserts', 'stationery', 'snacks', 'tiffin'];

  useEffect(() => {
    itemService.getMenuItems()
      .then((res) => {
        setTotalItems(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  });

    if (!checkLocalData()) {
      navigate('/login');
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id=totalItems+101;
      const response = await itemService.addToMenu(id, name, price, quantity, image, type, category);
      console.log(response.data);
      alert('Item added successfully!');
      setName('');
      setQuantity('');
      setType('');
      setImage('');
      setPrice('');
      setCategory('');
    } catch (err) {
      console.log(err);
      alert('Failed to add item. Please try again.');
    }
  };

  useEffect(() => {
    if (!checkLocalData()) {
      navigate('/login');
    }
  }, []);

  return (
    <div className='add-item-page'>
      <div className="add-item-img">
        <img src={ordersImg} alt="add-item" />
      </div>
      <div className="add-item-content">
        <div className="add-item-heading">
        <div className="back-btn">
              <span title="Go back" className="cart-arrow" onClick={() => navigate(-1)}>
                  &lt;
              </span>
          </div>
          <h1>Add New Item</h1>
        </div>
        <form onSubmit={handleSubmit} className="add-item-body">
          <div className="form-group">
            <label>Id:</label>
            <input type="text" value={totalItems+101} disabled/>
          </div>
          <div className="form-group">
            <label>Item Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Quantity:</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Type:</label>
            <select value={type} onChange={(e) => setType(e.target.value)} required>
              <option value="" disabled>Select Type</option>
              <option value='veg'>Veg</option>
              <option value='non-veg'>Non-Veg</option>
              <option value='others'>Others</option>
            </select>
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form-group image-url">
            <label>Image URL:</label>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
          </div>
          <button className='add-item-button' type="submit">Add Item</button>
        </form>
      </div>
    </div>
  );
}
