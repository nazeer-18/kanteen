import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import OrderItem from './OrderItem';
import ordersImg from '../images/order-history.svg';
import '../styles/OrderHistory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import orderService from '../services/orderService';

export default function OrderHistory() {
    const navigate = useNavigate();
    const { user } = useUser();
    const userId = user.emailId;
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState({
        period: '',
        orderStatus: '',
        startDate: '',
        endDate: ''
    });
    const [filtersUpdated, setFiltersUpdated] = useState(false);
    useEffect(() => { 
        if(filter.period === '' && filter.orderStatus === '' && filter.startDate === '' && filter.endDate === ''){
            setFilteredOrders(orders);
        }
    });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await orderService.fetchOrders(userId);
                const orders = res.data.orders;
                const sortedOrders = orders.slice().sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB - dateA;
                });
                setOrders(sortedOrders);  
            } catch (err) {
                console.error('Error fetching orders', err);
            } 
        };
        fetchOrders(); 
        const interval = setInterval(fetchOrders, 2000);
        return () => clearInterval(interval);
    }, [userId]);

    const toLocaleDateString = (date) => {
        return new Date(date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
    };

    const togglepopup = () => {
        setIsOpen(prev => !prev);
    };


    const handleFilterChange = (key, value) => {
        if (key === 'startDate' || key === 'endDate') {
            setFilter(prev => ({
                ...prev,
                [key]: value,
                period: ''
            }));
        } else if (key === 'period') {
            setFilter(prev => ({
                ...prev,
                [key]: prev[key] === value ? '' : value,
                startDate: '',
                endDate: ''
            }));
        } else {
            setFilter(prev => ({
                ...prev,
                [key]: prev[key] === value ? '' : value
            }));
        }
        setFiltersUpdated(true);
    };
    
    useEffect(() => {
        if (filtersUpdated) {
            applyFilters();
        }
    }, [filtersUpdated]);
    const [results, setResults] = useState(0);
    const [tempOrders, setTempOrders] = useState([]);

    const applyFilters = () => {
        const filtered = orders.filter(order => {
            const orderDate = new Date(order.date);
            const startDate = filter.startDate ? new Date(filter.startDate) : null;
            const endDate = filter.endDate ? new Date(filter.endDate) : null;
            let isPeriodMatch = true;
            let isOrderStatusMatch = true;
            let isDateRangeMatch = true;
    
            if (filter.period) {
                const today = new Date();
                const todayEnd = new Date(today.setHours(23, 59, 59, 999));
                const weekStart = new Date(today.setDate(today.getDate() - 6));
                weekStart.setHours(0, 0, 0, 0);
                const weekEnd = todayEnd;
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                monthStart.setHours(0, 0, 0, 0);
                const monthEnd = todayEnd;
                const prevMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                prevMonthStart.setHours(0, 0, 0, 0);
                const prevMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
                prevMonthEnd.setHours(23, 59, 59, 999);
                const yearStart = new Date(today.getFullYear(), 0, 1);
                yearStart.setHours(0, 0, 0, 0);
                const yearEnd = todayEnd;
    
                switch (filter.period) {
                    case 'Today':
                        isPeriodMatch = orderDate.toDateString() === new Date().toDateString();
                        break;
                    case 'Last 7 days':
                        isPeriodMatch = orderDate >= weekStart && orderDate <= weekEnd;
                        break;
                    case 'This Month':
                        isPeriodMatch = orderDate >= monthStart && orderDate <= monthEnd;
                        break;
                    case 'Previous Month':
                        isPeriodMatch = orderDate >= prevMonthStart && orderDate <= prevMonthEnd;
                        break;
                    case 'This Year':
                        isPeriodMatch = orderDate >= yearStart && orderDate <= yearEnd;
                        break;
                    default:
                        isPeriodMatch = true;
                }
            }
    
            if (filter.orderStatus) {
                isOrderStatusMatch = order.orderStatus === filter.orderStatus;
            }
    
            if (startDate && endDate) {
                startDate.setHours(0, 0, 0, 0);
                if (endDate.toDateString() === new Date().toDateString()) {
                    isDateRangeMatch = orderDate >= startDate && orderDate <= new Date();
                } else {
                    endDate.setHours(23, 59, 59, 999);
                    isDateRangeMatch = orderDate >= startDate && orderDate <= endDate;
                }
            }
    
            return isPeriodMatch && isOrderStatusMatch && isDateRangeMatch;
        });
    
        setTempOrders(filtered);
        setResults(filtered.length);
        setFiltersUpdated(false);
    };
    

    const clearFilters = () => {
        setFilter({
            period: '',
            orderStatus: '',
            startDate: '',
            endDate: ''
        });
        setFilteredOrders(orders);
    };
    const setFilterOrders = () => {  
        setFilteredOrders(tempOrders);
        togglepopup();  
    }

    return (
        <div className="order-history-page">
            {isOpen && <div className="overlay" onClick={togglepopup}></div>}
            <div className="order-history-img">
                <img src={ordersImg} alt="order-history" />
            </div>
            <div className="order-history-content">
                <div className="order-history-heading">
                    <div className="back-btn">
                        <span title="Go back" className="cart-arrow" onClick={() => navigate(-1)}>
                            &lt;
                        </span>
                    </div>
                    <h1>Your Orders</h1>
                    <div className="order-history-filters" onClick={togglepopup} style={{ cursor: 'pointer' }}>
                        <span>Filters</span> <FontAwesomeIcon icon={faFilter} />
                    </div>
                    {isOpen && (
                        <div className="order-filter-container">
                            <div className="order-filter">
                                Filters
                                <span className="close-filterpopup">
                                    <FontAwesomeIcon icon={faTimes} onClick={togglepopup} />
                                </span>
                            </div>
                            <div className="order-filter-table">
                                <div className="order-filter-item">Period</div>
                                <div className="order-filter-content-container">
                                    {['Today', 'Last 7 days', 'This Month', 'Previous Month', 'This Year'].map(period => (
                                        <div
                                            key={period}
                                            className={`order-filter-content ${filter.period === period ? 'selected' : ''}`}
                                            onClick={() => handleFilterChange('period', period)}
                                        >
                                            {period}
                                        </div>
                                    ))}
                                </div>
                                <div className="order-filter-item">Select Period</div>
                                <div className="order-filter-calender">
                                    <input 
                                        type="date" 
                                        className="order-filter-date" 
                                        value={filter.startDate} 
                                        onChange={(e) => handleFilterChange('startDate', e.target.value)} 
                                    />
                                    <span className="order-filter-date-separator">-</span>
                                    <input 
                                        type="date" 
                                        className="order-filter-date" 
                                        value={filter.endDate} 
                                        onChange={(e) => handleFilterChange('endDate', e.target.value)} 
                                    />
                                </div>
                                <div className='order-filter-item'>Order Status</div>
                                <div className="order-filter-content-container">
                                    {['completed', 'cancelled', 'processing'].map(status => (
                                        <div
                                            key={status}
                                            className={`order-filter-content ${filter.orderStatus === status ? 'selected' : ''}`}
                                            onClick={() => handleFilterChange('orderStatus', status)}
                                        >
                                            {status}
                                        </div>
                                    ))}
                                </div>
                                <div className="order-filter-actions">
                                    <button onClick={setFilterOrders}>Show Results({results})</button>
                                    <button onClick={clearFilters}>Clear</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="order-history-body">
                    {filteredOrders.length > 0 ? (
                        <div>
                            {filteredOrders.map(item => (
                                <OrderItem
                                    key={item._id}
                                    date={toLocaleDateString(item.date)}
                                    orderId={item._id}
                                    orderStatus={item.orderStatus}
                                    paymentMode={item.paymentMode}
                                    paymentStatus={item.paymentStatus}
                                    total={item.total}
                                    odid={item._id}
                                />
                            ))}
                        </div>
                    ) : (
                        <div>
                            <p className="empty-orders">No Orders Found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}