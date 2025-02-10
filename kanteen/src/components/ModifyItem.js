import React, { useEffect, useState, useRef } from 'react';
import { useUser } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import itemService from '../services/itemService';
import modifyitem from '../images/modifyitem.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../styles/ModifyItem.css';

export default function ModifyItem() {
    const navigate = useNavigate();
    const { user, checkLocalData } = useUser();
    const [item, setItem] = useState(null); 
    const [error, setError] = useState(''); 
    const categories = ['beverages', 'starters', 'main course', 'desserts', 'stationery', 'snacks', 'tiffin'];
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]); 
    const [showSuggestions, setShowSuggestions] = useState(false); 
    const [items, setItems] = useState([]); 
    const searchRef = useRef(null); 

    useEffect(() => {
        if (!checkLocalData()) {
            navigate('/login');
        }
    }, [navigate, checkLocalData]);

    // Fetch all items from the API
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await itemService.getMenuItems();
                setItems(response.data); 
            } catch (err) {
                console.log(err);
            }
        };
        fetchItems();
    }, []);

    // Handle search term changes
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value) {
            const filteredSuggestions = items.filter((item) =>
                item.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    // Handle selecting a suggestion from the dropdown
    const handleSuggestionClick = (selectedItem) => {
        setSearchTerm(selectedItem.name);
        setItem(selectedItem); 
        setShowSuggestions(false); 
    };

    // Handle search by ID or name
    const handleSearch = () => {
        if (searchTerm) {
            itemService.fetchItemData(searchTerm)
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
                    setError('Error fetching item');
                    setItem(null);
                });
        }
    };

    // Handle Enter key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const response = itemService.ModifyItem(item.id, item.name, item.price, item.quantity, item.image, item.type, item.category);
            console.log(response.data);
            alert('Item modified successfully!');
            setSearchTerm('');
            setItem(null);
        } catch (err) {
            console.log(err);
            alert('Failed to modify item. Please try again.');
        }
    };

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItem(prevItem => ({
            ...prevItem,
            [name]: value,
        }));
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                <div className="modifyitem-searchbar" ref={searchRef}>
                    <input
                        type="text"
                        placeholder="Search by ID or Name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleSearch}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="suggestions-dropdown">
                            {suggestions.map((suggestion) => (
                                <div
                                    key={suggestion.id}
                                    className="suggestion-item"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion.name}
                                </div>
                            ))} 
                        </div>
                    )}
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
                                disabled
                                className='item-name-disabled'
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
                        <div className='modifyitem-buttons'>
                            <button
                                type="button"
                                className="deleteitem-button"
                                onClick={() => {
                                    console.log(item.id);
                                    if (window.confirm('Are you sure you want to delete this item?')) {
                                        itemService.deleteItem(item.id)
                                            .then(() => {
                                                alert('Item deleted successfully!');
                                                setSearchTerm('');
                                                setItem(null);
                                            })
                                            .catch(err => {
                                                console.log(err);
                                                alert('Failed to delete item. Please try again.');
                                            });
                                    }
                                }}
                            >
                                Delete
                            </button>
                            <button className="modifyitem-button" type="submit">Modify</button>
                        </div>
                    </form>
                )}
            </div>
            <div className="modifyitem-img">
                <img src={modifyitem} alt="modifyitem" />
            </div>
        </div>
    );
}