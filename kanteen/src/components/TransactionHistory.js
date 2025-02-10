import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/TransactionHistory.css';
import TransactionSvg from '../images/transactions.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import transactionService from '../services/transactionService';
import { useUser } from '../contexts/userContext';

export default function TransactionHistory() {
    const navigate = useNavigate();
    const { user, checkLocalData } = useUser();
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState({
        period: '',
        startDate: '',
        endDate: '',
        orderMode: ''
    });
    const [filtersUpdated, setFiltersUpdated] = useState(false);
    const [filteredCount, setFilteredCount] = useState(0);

    const getTransactions = async (emailId) => {
        const response = await transactionService.getTransactions(emailId);
        const sortedTransactions = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTransactions(sortedTransactions);
        setFilteredTransactions(sortedTransactions);
        setFilteredCount(sortedTransactions.length); 
    };

    useEffect(() => {
        if (!checkLocalData()) {
            navigate('/login');
        } else {
            getTransactions(user.emailId);
        }
    }, [user.emailId]);

    const changeToLocalDate = (date) => new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const changeToLocalTime = (date) => new Date(date).toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    const togglepopup = () => setIsOpen(prev => !prev);

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

    const filterTransactions = (transactions, filter) => {
        return transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            const startDate = filter.startDate ? new Date(filter.startDate) : null;
            const endDate = filter.endDate ? new Date(filter.endDate) : null;
            let isPeriodMatch = true;
            let isOrderModeMatch = true;
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
                        isPeriodMatch = transactionDate.toDateString() === new Date().toDateString();
                        break;
                    case 'Last 7 days':
                        isPeriodMatch = transactionDate >= weekStart && transactionDate <= weekEnd;
                        break;
                    case 'This Month':
                        isPeriodMatch = transactionDate >= monthStart && transactionDate <= monthEnd;
                        break;
                    case 'Previous Month':
                        isPeriodMatch = transactionDate >= prevMonthStart && transactionDate <= prevMonthEnd;
                        break;
                    case 'This Year':
                        isPeriodMatch = transactionDate >= yearStart && transactionDate <= yearEnd;
                        break;
                    default:
                        isPeriodMatch = true;
                }
            }

            if (filter.orderMode) {
                isOrderModeMatch = transaction.mode === filter.orderMode.toLowerCase();
            }

            if (startDate && endDate) {
                startDate.setHours(0, 0, 0, 0);
                if (endDate.toDateString() === new Date().toDateString()) {
                    isDateRangeMatch = transactionDate >= startDate && transactionDate <= new Date();
                } else {
                    endDate.setHours(23, 59, 59, 999);
                    isDateRangeMatch = transactionDate >= startDate && transactionDate <= endDate;
                }
            }

            return isPeriodMatch && isOrderModeMatch && isDateRangeMatch;
        });
    };

    useEffect(() => {
        if (filtersUpdated) {
            const filtered = filterTransactions(transactions, filter);
            setFilteredCount(filtered.length); 
        }
    }, [filtersUpdated, transactions, filter]);

    const applyFilters = () => {
        const filtered = filterTransactions(transactions, filter);
        setFilteredTransactions(filtered);
        setFiltersUpdated(false);
        togglepopup();
    };

    const clearFilters = () => {
        setFilter({
            period: '',
            startDate: '',
            endDate: '',
            orderMode: ''
        });
        setFilteredTransactions(transactions);
        setFilteredCount(transactions.length); 
    };

    return (
        <div className="transaction-page">
            {isOpen && <div className="overlay" onClick={togglepopup}></div>}
            <div className="transaction-img">
                <img src={TransactionSvg} alt="Transaction" />
            </div>
            <div className="transaction-content">
                <div className="transaction-history-heading">
                    <div className="back-btn">
                        <span title="Go back" className="cart-arrow" onClick={() => navigate(-1)}>&lt;</span>
                    </div>
                    <p className='your-transactions'>Your Transactions</p>
                    <div className="transaction-history-filters" onClick={togglepopup} style={{ cursor: 'pointer' }}>
                        <span>Filters</span> <FontAwesomeIcon icon={faFilter} />
                    </div>
                    {isOpen && (
                        <div className="transaction-filter-container">
                            <div className="transaction-filter">
                                Filters <span className="close-filterpopup"><FontAwesomeIcon icon={faTimes} onClick={togglepopup} /></span>
                            </div>
                            <div className="transaction-filter-table">
                                <div className="transaction-filter-item">Period</div>
                                <div className="transaction-filter-content-container">
                                    {['Today', 'Last 7 days', 'This Month', 'Previous Month', 'This Year'].map(period => (
                                        <div
                                            key={period}
                                            className={`transaction-filter-content ${filter.period === period ? 'selected' : ''}`}
                                            onClick={() => handleFilterChange('period', period)}
                                        >
                                            {period}
                                        </div>
                                    ))}
                                </div>
                                <div className="transaction-filter-item">Select Period</div>
                                <div className="transaction-filter-calender">
                                    <input
                                        type="date"
                                        className="transaction-filter-date"
                                        value={filter.startDate}
                                        onChange={(e) => handleFilterChange('startDate', e.target.value)}
                                    />
                                    <span className="transaction-filter-date-separator">-</span>
                                    <input
                                        type="date"
                                        className="transaction-filter-date"
                                        value={filter.endDate}
                                        onChange={(e) => handleFilterChange('endDate', e.target.value)}
                                    />
                                </div>
                                <div className="transaction-filter-item">Order Mode</div>
                                <div className="transaction-filter-content-container">
                                    {['Cash', 'Online'].map(mode => (
                                        <div
                                            key={mode}
                                            className={`transaction-filter-content ${filter.orderMode === mode ? 'selected' : ''}`}
                                            onClick={() => handleFilterChange('orderMode', mode)}
                                        >
                                            {mode}
                                        </div>
                                    ))}
                                </div>
                                <div className="transaction-filter-actions">
                                    <button onClick={applyFilters}>Show Results ({filteredCount})</button>
                                    <button onClick={clearFilters}>Clear</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="transaction-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Amount</th>
                                <th>Mode</th>
                                <th>Order Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((transaction) => (
                                <tr key={transaction._id}>
                                    <td>{changeToLocalDate(transaction.date)}<br />{changeToLocalTime(transaction.date)}</td>
                                    <td>₹ {transaction.amount}</td>
                                    <td>{transaction.mode}</td>
                                    <td>
                                        <Link to={`/vieworder?id=${transaction.orderId}`}>
                                            <button>View order</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}