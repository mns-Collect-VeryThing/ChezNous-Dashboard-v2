import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_CLOSE_TYPES } from '../../../utils/globalConstantUtil'
import { deleteLead } from '../../clients/leadSlice'
import { showNotification } from '../headerSlice'
import {useEffect} from "react";

function OrderModalBody({ extraObject, closeModal}){

    const dispatch = useDispatch()

    const { orderId } = extraObject

    useEffect(() => {
        console.log(orderId)

    }, [orderId]);

    return(
        <>
            <h2 class="text-2xl font-semibold mb-4">Détails de la Commande</h2>
            <div class="client-address mb-6">
                <h3 class="text-xl font-semibold mb-2">Adresse du Client :</h3>
                <p class="text-gray-700">
                    Nom : Bastien Dupont<br/>
                    Adresse : 123 Rue de la Liberté, Appartement 4B<br/>
                    Ville : Metz<br/>
                    Code Postal : 57000<br/>
                    Pays : France<br/>
                    Téléphone : +33 6 12 34 56 78
                </p>
            </div>
            <div class="order-content mb-6">
                <h3 class="text-xl font-semibold mb-2">Contenu de la Commande :</h3>
                <ul class="text-gray-700 list-disc list-inside">
                    <li>1x Sushi Maki - 12 pièces</li>
                    <li>2x Ramen au Poulet</li>
                    <li>1x Tempura de Crevettes</li>
                    <li>1x Thé Vert Matcha</li>
                    <li>1x Dessert Mochi - 3 pièces</li>
                </ul>
            </div>
            <div class="order-total mb-6">
                <h3 class="text-xl font-semibold mb-2">Total : 45,50€</h3>
            </div>

        <div className="modal-action mt-12">
                
                <button className="btn btn-primary   " onClick={() => console.log('oui')}>Expédier</button>

        </div>
        </>
    )
}

export default OrderModalBody