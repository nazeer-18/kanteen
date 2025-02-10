import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import itemService from '../services/itemService';
import modifyitem from '../images/modifyitem.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import '../styles/ModifyItem.css';

export default function ModifyItem() {
    const navigate = useNavigate();
    const { user, checkLocalData } = useUser();
    const [id, setId] = useState('');
    const [item, setItem] = useState(null); // State to store the fetched item
    const [error, setError] = useState(''); // State to handle errors
    const categories = ['beverages', 'starters', 'main course', 'desserts', 'stationery', 'snacks', 'tiffin'];

    useEffect(() => {
        if (!checkLocalData()) {
            navigate('/login');
        }
    }, [navigate, checkLocalData]);

    const handleSearch = () => {
        itemService.fetchItemData(id)
            .then(response => {
                if (response.data && response.data.length > 0) {
                    setItem(response.data[0]); 
                    setError(''); 
                } else {
                    setError('Item not found'); 
                    setItem(null); 
                }
            })
            .catch(error => {
                setError('Error fetching item'); // Handle the error
                setItem(null); // Clear the item data
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItem(prevItem => ({
            ...prevItem,
            [name]: value,
        }));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const response= itemService.ModifyItem(item.id, item.name, item.price, item.quantity, item.image, item.type, item.category);
            console.log(response.data);
            alert('Item modified successfully!');
            setId('');
            setItem(null);
        } catch (err) {
            console.log(err);
            alert('Failed to modify item. Please try again.');
        }
    };

    return (
        <div className="modifyitem-page">
            <div className="modifyitem-content">
                <div className="modifyitem-heading">
                    <div className="back-btn">
                        <span title="Go back" className="cart-arrow" onClick={() => navigate(-1)}>
                            &lt;
                        </span>
                    </div>
                    <h1>Modify Item</h1>
                </div>
                <div className="modifyitem-searchbar">
                    <input
                        type="text"
                        placeholder="Search by ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleSearch}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>

                {error && <p className="error-message">{error}</p>}

                {item && (
                    <form onSubmit={handleSubmit} className="modifyitem-body">
                        <div className="form-group">
                            <label>Item Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={item.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Quantity:</label>
                            <input
                                type="number"
                                name="quantity"
                                value={item.quantity}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Type:</label>
                            <select
                                name="type"
                                value={item.type}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" disabled>Select Type</option>
                                <option value="veg">Veg</option>
                                <option value="non-veg">Non-Veg</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Price:</label>
                            <input
                                type="text"
                                name="price"
                                value={item.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Category:</label>
                            <select
                                name="category"
                                value={item.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" disabled>Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group image-url">
                            <label>Image URL:</label>
                            <input
                                type="text"
                                name="image"
                                value={item.image}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button className="modifyitem-button" type="submit">Modify</button>
                    </form>
                )}
            </div>
            <div className="modifyitem-img">
                <img src={modifyitem} alt="modifyitem" />
            </div>
        </div>
    );
}