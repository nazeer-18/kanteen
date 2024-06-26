import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faFilter, faMagnifyingGlass, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import '../styles/Menu.css';
import MenuItem from './MenuItem';
import itemService from '../services/itemService';
import { useUser } from '../contexts/userContext';

export default function Menu() {
    const { user } = useUser();
    const userId = user.emailId;
    const [totalItems, setTotalItems] = useState(0);
    const [filterCount, setFilterCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (userId === 'na') {
            navigate('/login');
        }
    }, [userId]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await itemService.fetchCartItems(userId);
                setTotalItems(res.data.cart.totalItems);
            } catch (err) {
                console.error('Error fetching items', err);
            }
        };
        fetchItems();
        const interval = setInterval(fetchItems, 2000);
        return () => clearInterval(interval);
    }, [userId]);

    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [displayedItems, setDisplayedItems] = useState([]);
    const [isInitiated, setIsInitiated] = useState(false);
    const [message, setMessage] = useState('');
    const [displayMessage, setDisplayMessage] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const filterRef = useRef(null);
    const [selectedCategories, setSelectedCategories] = useState({
        starters: false,
        maincourse: false,
        desserts: false,
        snackitems: false,
        tiffin: false,
        stationery: false,
        beverages: false
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [availableOnly, setAvailableOnly] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await itemService.getMenuItems();
                setItems(res.data);
                if (!isInitiated) {
                    setFilteredItems(res.data);
                    setDisplayedItems(res.data);
                    setIsInitiated(true);
                }
            } catch (err) {
                console.error('Error fetching items', err);
            }
        };
        fetchItems();
        const interval = setInterval(fetchItems, 2000);
        return () => clearInterval(interval);
    }, [isInitiated]);

    useEffect(() => {
        applySearchFilter();
    }, [filteredItems, searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const countSelectedFilters = () => {
            const typeCount = selectedType ? 1 : 0;
            const categoryCount = Object.values(selectedCategories).filter(Boolean).length;
            setFilterCount(typeCount + categoryCount + (availableOnly ? 1 : 0));
        };
        countSelectedFilters();
    }, [selectedType, selectedCategories, availableOnly]);

    useEffect(() => {
        applyFilters();
    }, [selectedType, selectedCategories, availableOnly]);

    const searchHandler = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const applySearchFilter = () => {
        if (searchTerm) {
            const filtered = filteredItems.filter((item) => item.name.toLowerCase().includes(searchTerm));
            setDisplayedItems(filtered);
        } else {
            setDisplayedItems(filteredItems);
        }
    };

    const handleTypeChange = (type) => {
        setSelectedType(prevType => prevType === type ? '' : type);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories((prevCategories) => ({
            ...prevCategories,
            [category]: !prevCategories[category]
        }));
    };

    const handleAvailableItemsChange = () => {
        setAvailableOnly(prevAvailableOnly => !prevAvailableOnly);
    };

    const applyFilters = () => {
        let filtered = items;

        if (selectedType) {
            filtered = filtered.filter((item) => item.type.toLowerCase() === selectedType.toLowerCase());
        }

        const activeCategories = Object.keys(selectedCategories).filter((category) => selectedCategories[category]);
        if (activeCategories.length > 0) {
            filtered = filtered.filter((item) => activeCategories.includes(item.category.toLowerCase()));
        }

        if (availableOnly) {
            filtered = filtered.filter((item) => item.quantity > 0);
        }

        setFilteredItems(filtered);
    };

    const clearFilters = () => {
        setSelectedType('');
        setSelectedCategories({
            starters: false,
            maincourse: false,
            desserts: false,
            snackitems: false,
            tiffin: false,
            stationery: false,
            beverages: false
        });
        setAvailableOnly(false);
        setFilteredItems(items);
        setSearchTerm('');
    };

    const viewCart = () => {
        navigate('/cart');
    };

    return (
        <div>
            <div className="orderpage-nav">
                <div ref={filterRef} className="orderpage-filter" title="apply filters" onClick={()=>setIsOpen(!isOpen)} >
                    <span className="orderpage-cart-nav-label" style={{ color: "black" }}>FILTERS</span>
                    <span className="filter-holder">
                        {   
                            filterCount > 0 &&
                            <span className="filter-items-cnt">{filterCount}</span>
                        }
                        <FontAwesomeIcon icon={faFilter} style={{ cursor: "pointer" }} />
                    </span>
                </div>

                {(
                    <div className={`filter-dropdown-menu ${isOpen ? 'filter-open' : ''}`}>
                        <div className="filter-dropdown-type">
                            <div className="filter-dropdown-item">TYPE</div>
                            <div className="filter-dropdown-close" onClick={() => setIsOpen(false)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </div>
                            <div className="filter-dropdown-content">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedType === 'VEG'}
                                        onChange={() => handleTypeChange('VEG')}
                                    />
                                    VEG
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedType === 'NON-VEG'}
                                        onChange={() => handleTypeChange('NON-VEG')}
                                    />
                                    NON-VEG
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedType === 'OTHERS'}
                                        onChange={() => handleTypeChange('OTHERS')}
                                    />
                                    OTHERS
                                </label>
                            </div>
                        </div>
                        <div className="filter-dropdown-category">
                            <div className="filter-dropdown-item">CATEGORY</div>
                            <div className="filter-dropdown-content">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.starters}
                                        onChange={() => handleCategoryChange('starters')}
                                    />
                                    STARTERS
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.maincourse}
                                        onChange={() => handleCategoryChange('maincourse')}
                                    />
                                    MAIN COURSE
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.desserts}
                                        onChange={() => handleCategoryChange('desserts')}
                                    />
                                    DESSERTS
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.snackitems}
                                        onChange={() => handleCategoryChange('snackitems')}
                                    />
                                    SNACK ITEMS
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.tiffin}
                                        onChange={() => handleCategoryChange('tiffin')}
                                    />
                                    BREAKFAST
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.stationery}
                                        onChange={() => handleCategoryChange('stationery')}
                                    />
                                    STATIONERY
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.beverages}
                                        onChange={() => handleCategoryChange('beverages')}
                                    />
                                    BEVERAGES
                                </label>
                            </div>
                            <label className='filter-dropdown-item'>
                                <a
                                    style={{ cursor: "pointer" }}
                                    onClick={handleAvailableItemsChange}
                                >AVAILABLE</a>

                            </label>

                            <FontAwesomeIcon icon={availableOnly ? faCheck : ''} style={{ color: 'green' }} />
                        </div>
                        <div className="filter-dropdown-actions">
                            <button onClick={clearFilters}>CLEAR</button>
                        </div>
                    </div>
                )}
                <div className="orderpage-search">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={searchHandler}
                        placeholder='Search any item here..'
                    />
                    <span className="orderpage-search-icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>
                </div>
                <div className="orderpage-cart" title="View items in cart" onClick={viewCart}>
                    <span className="orderpage-cart-nav-label" style={{ color: "black" }}>CART</span>
                    <span className="cart-holder">
                        {
                            totalItems > 0 &&
                            <span className="cart-items-cnt">{totalItems}</span>
                        }
                        <FontAwesomeIcon icon={faCartShopping} />
                    </span>
                </div>
            </div>
            <div className="orderpage-floating-menu"></div>
            <div className="orderpage-menu-items">
                {displayMessage && (
                    <div className="orderpage-cart-msg">
                        {message}
                    </div>
                )}
                {displayedItems.length === 0 ? (
                    <h1 style={{ margin: "auto" }}>No items found</h1>
                ) : (
                    displayedItems.map((item) => (
                        <MenuItem key={item._id} item={item} setDisplayMessage={setDisplayMessage} setMessage={setMessage} />
                    ))
                )}
            </div>
        </div>
    );
}
