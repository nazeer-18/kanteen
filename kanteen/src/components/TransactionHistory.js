import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/TransactionHistory.css'
import TransactionSvg from '../images/transactions.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

export default function TransactionHistory() {
    const navigate = useNavigate()
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
                            <tr>
                            <td>12/12/2021 <br /> 12:00 </td>
                                <td>₹ 200</td>
                                <td>Cash</td>
                                <td>Completed</td>
                                <td><button>View order</button></td> 
                            </tr>
                            <tr>
                                <td>12/12/2021 <br /> 12:00 </td> 
                                <td>₹ 200</td>
                                <td>Card</td>
                                <td>Completed</td>
                                <td><button>View order</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
