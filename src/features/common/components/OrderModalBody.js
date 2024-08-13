import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_CLOSE_TYPES } from '../../../utils/globalConstantUtil'
import { deleteLead } from '../../clients/leadSlice'
import { showNotification } from '../headerSlice'
import {useEffect} from "react";
import {getOrdersByShop, sendOrder} from "../../../service/orderService";

function OrderModalBody({ extraObject, closeModal}){

    const dispatch = useDispatch()

    const { orderDetail } = extraObject


    const doSendOrder = async () => {
        await sendOrder(orderDetail.id).then(() => closeModal());
    };

    return(
        <>
            <h2 class="text-2xl font-semibold mb-4">Détails de la Commande</h2>
            <div class="client-address mb-6">
                <h3 class="text-xl font-semibold mb-2">Adresse du Client :</h3>
                <p class="text-gray-700">
                    Nom : {orderDetail.deliveryAddress.firstname} {orderDetail.deliveryAddress.lastname}<br/>
                    Adresse : {orderDetail.deliveryAddress.street}<br/>
                    Ville : {orderDetail.deliveryAddress.city}<br/>
                    Code Postal : {orderDetail.deliveryAddress.zipcode}<br/>
                    Pays : {orderDetail.deliveryAddress.country}
                </p>
            </div>
            <div class="order-content mb-6">
                <h3 class="text-xl font-semibold mb-2">Contenu de la Commande :</h3>
                <ul class="text-gray-700 list-disc list-inside">
                    {orderDetail.cart.products.map((p, k) => <li key={k}>1x {p.name} : {p.price} €</li>)}

                </ul>
            </div>
            <div class="order-total mb-6">
                <h3 class="text-xl font-semibold mb-2">Total : {orderDetail.cart.totalPrice} €</h3>
            </div>

        <div className="modal-action mt-12">
                <button className="btn btn-primary" onClick={doSendOrder}>Expédier</button>
        </div>
        </>
    )
}

export default OrderModalBody