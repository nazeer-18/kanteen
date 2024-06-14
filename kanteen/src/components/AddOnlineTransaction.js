import React, { useEffect, useState } from 'react';
import paymentService from '../services/paymentService';
import transactionService from '../services/transactionService';
import { Navigate } from 'react-router-dom';

export default function AddOnlineTransaction(){
    const navigate=Navigate();
    const [transactionCreated,settransactionCreated]=useState('false');
    const orderId = new URLSearchParams(window.location.search).get("oid");
    const userId = new URLSearchParams(window.location.search).get("uid");
    const getPaymentStatus=async(id) =>{
        return await paymentService.paymentStatus(id);
    }
    const response= getPaymentStatus(orderId);
    console.log(response.data.status);
    const createTransaction = async () => {
        try {
            const response = await transactionService.createTransaction(userId, orderId, "online", response.data.status);
            console.log(response.status);
            return 1;
        }
        catch (err) {
            console.error(err);
        }
    }
    if(createTransaction===1) settransactionCreated(true);
    useEffect(()=>{
        if(transactionCreated) navigate(`/vieworder?id=${orderId}`);
    })
    return(
        <p>redirecting</p>
    )
}
