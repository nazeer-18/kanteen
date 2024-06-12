import React from 'react'


export default function ViewOrder() {
    const orderId = new URLSearchParams(window.location.search).get("id");
    return (
        <div>   
            this is view orders page <br /> 
            your order id is : {orderId}
        </div>
    )
}
