import React, { useEffect, useState } from 'react';
import paymentService from '../services/paymentService';
import transactionService from '../services/transactionService';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';

export default function AddOnlineTransaction(){
    const navigate=Navigate();
    const { user } = useUser();
    const [transactionCreated,settransactionCreated]=useState('false');
    const orderId = new URLSearchParams(window.location.search).get("oid");
    const emailId = new URLSearchParams(window.location.search).get("eid");
    const getPaymentStatus=async(id) =>{
        return await paymentService.paymentStatus(id);
    }
    const response= getPaymentStatus(orderId);
    console.log(response.data.status);
    const createTransaction = async () => {
        try {
            const response = await transactionService.createTransaction(emailId, orderId, "online", response.data.status);
            console.log(response.status);
            settransactionCreated(true);
        }
        catch (err) {
            console.error(err);
        }
    }
    const validateUser=async()=>{
        try{
            // const alphanumericId = emailId.replace(/[^a-zA-Z0-9]/g, '');
            const response=await paymentService.checkUserAuth(orderId,emailId);
            if(response.data.logout===true){
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        }catch(err){
            console.error(err);
        }
    };

    useEffect(()=>{
        if(transactionCreated) navigate(`/vieworder?id=${orderId}`);
    },[transactionCreated])

    useEffect(() => {
        validateUser();
        if (user.emailId === 'na') {
            // alert('Please login to continue');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
        createTransaction();
    },[]);
    return(
        <p>redirecting</p>
    )
}
