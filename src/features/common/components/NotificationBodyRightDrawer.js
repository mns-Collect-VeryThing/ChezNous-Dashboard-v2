import {getOrdersByShop, getPayedOrdersByShop} from "../../../service/orderService";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

function NotificationBodyRightDrawer(){

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const response = await getPayedOrdersByShop({shopId : localStorage.getItem('shopId')});
        setOrders(response);
    };


    useEffect(() => {
        fetchOrders().then();
    }, []);

    console.log(orders);

    return(
        <>
             {
                 <div className="grid mt-3 card bg-base-200 rounded-box p-3 bg-blue-100">
                     Il y a {orders.length} commande{orders.length > 1 ? 's' : ''} a éxpédier.
                 </div>
             }
        </>
    )
}

export default NotificationBodyRightDrawer