import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/TransactionHistory.css'
import TransactionSvg from '../images/transactions.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import transactionService from '../services/transactionService';
import { useUser } from '../contexts/userContext';

export default function TransactionHistory() {
    const navigate = useNavigate();
    const { user } = useUser();
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        const getTransactions = async () => {
            const response = await transactionService.getTransactions(user.emailId);
            const sortedTransactions = response.data.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            })
            setTransactions(sortedTransactions);
        }
        getTransactions();
    }, [])
    const changeToLocalDate = (date) => {
        return new Date(date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric', 
        })
    }
    const changeToLocalTime = (date) => {
        return new Date(date).toLocaleTimeString('en-GB', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
    }
    return (
        <div className="transaction-page">
            <div className="transaction-img">
                <img src={TransactionSvg} alt="Transaction" />
            </div>
            <div className="transaction-content">
                <div className="transaction-history-heading">
                    <div className="back-btn">
                        <span title="Go back" className="cart-arrow" onClick={() => {
                            navigate(-1);
                        }}>
                            &lt;
                        </span>
                    </div>
                    <p className='your-transactions'>
                        Your Transactions
                    </p>
                    <div className="transaction-history-filters">
                        <span>Filters</span> <FontAwesomeIcon icon={faFilter} />
                    </div>
                </div>
                <div className="transaction-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Amount</th>
                                <th>Mode</th>
                                <th>Status</th>
                                <th>Order Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => {
                                return (
                                    <tr key={transaction._id}>
                                        <td>{changeToLocalDate(transaction.date)}<br />{changeToLocalTime(transaction.date)} <br />  </td>
                                        <td>₹ {transaction.amount}</td>
                                        <td>{transaction.mode}</td>
                                        <td>{transaction.status}</td>
                                        <td>
                                            <Link to={`/vieworder?id=${transaction._id}`}>
                                                <button>View order</button>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
