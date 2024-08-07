import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import { RECENT_TRANSACTIONS } from "../../utils/dummyData"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../../components/Input/SearchBar"
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import {EyeIcon} from "@heroicons/react/20/solid";
import {openModal} from "../common/modalSlice";
import {CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES} from "../../utils/globalConstantUtil";

const TopSideButtons = ({removeFilter, applyFilter, applySearch}) => {

    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        // dispatch(openModal({title : "Add New Lead", bodyType : MODAL_BODY_TYPES.LEAD_ADD_NEW}))
        dispatch(openModal({title : "Ajouer un produit", bodyType : MODAL_BODY_TYPES.PRODUCT_ADD}))
    }

    return(
        <div className="inline-block float-right space-x-4">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Ajouter</button>
        </div>
    )
}


function Products(){


    const [trans, setTrans] = useState(RECENT_TRANSACTIONS)


    const getStock = (index) => {
        if(index > 5)return <div className="badge badge-success">En stock</div>
        else if(index == 0 )return <div className="badge badge-error">Rupture</div>
        else return <div className="badge badge-warning">Stock faible</div>
    }

    const dispatch = useDispatch()


    const openOrderModal = (index) => {
        dispatch(openModal({title : "Modifier un produit", bodyType : MODAL_BODY_TYPES.PRODUCT_UPDATE}))
    }

    return(
        <>
            
            <TitleCard title="Vos produits" topMargin="mt-2" TopSideButtons={<TopSideButtons/>}>

                {/* Team Member list in table format loaded constant */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Nom du produit</th>
                        <th>Prix unitaire</th>
                        <th>Quantité</th>
                        <th>Stock</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            trans.map((l, k) => {
                                return(
                                    <tr key={k}>
                                        <td>{l.name}</td>
                                        <td>${l.amount}</td>
                                        <td>{l.quantity}</td>
                                        <td>{getStock(l.quantity)}</td>
                                        <td>
                                            <button className="btn btn-square btn-ghost"
                                                    onClick={() => openOrderModal(k)}><EyeIcon className="w-5"/>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            </TitleCard>
        </>
    )
}


export default Products