import React from 'react'
import '../styles/OrderItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faWallet,faRupee, faIndianRupee} from '@fortawesome/free-solid-svg-icons'

export default function OrderItem() {
    return (
        <div className="order-item-container">
            <div className="order-item-content">
            <div className="order-status"> 
                            {/*status can be pending, processing, completed, cancelled
                            yet to  add bg and fg green for  completed,  red  for  cancelled , light blue for processing and yellow for pending*/}
                            completed
                        </div>
                <div className="order-item-details-first order-item">
                    <div className="order-details">
                        <div className="ordered-date">
                            Ordered on : 12/12/2021
                        </div>
                        <div className="order-id">
                            <strong>Order ID</strong> : #1234567890123456
                        </div>
                    </div>
                    <div className="order-explore">
                        <div className="order-explore-button">
                            <button>
                                View Details    
                            </button>
                        </div>
                    </div>
                </div> 
                <hr />
                <div className="order-item-details-second order-item">
                    <div className="payment-details">
                        <FontAwesomeIcon icon={faWallet}/> &nbsp;
                        <div className="order-payment-status">
                            <div>
                                Payment method : <span className="txt-black">Cash</span>
                            </div> 
                            <div >
                                Payment Status : <span className='txt-black'>Paid</span>
                            </div>
                        </div>
                    </div>
                    <div className="order-item-total">
                        Total : <FontAwesomeIcon icon={faIndianRupee}/> <span className="txt-black">10,000</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
