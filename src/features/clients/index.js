import moment from "moment"
import {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { deleteLead, getLeadsContent } from "./leadSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { showNotification } from '../common/headerSlice'
import Avatar from "../../components/Avatar";
import {getCustomerByShop} from "../../service/customerService";

const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        dispatch(openModal({title : "Add New Lead", bodyType : MODAL_BODY_TYPES.LEAD_ADD_NEW}))
    }

    return(
        <div className="inline-block float-right space-x-4">
            <button className="btn px-6 btn-sm normal-case btn-primary btn-outline" onClick={() => openAddNewLeadModal()}>Exporter</button>
            {/*<button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Ajouter</button>*/}
        </div>
    )
}

function Clients(){

    const {leads } = useSelector(state => state.lead)
    const [customers, setCustomers] = useState(null)
    const dispatch = useDispatch();

    const fetchCustomer = async () => {
        const response = await getCustomerByShop({shopId : localStorage.getItem('shopId')});
        setCustomers(response);
    };

    useEffect(() => {
        dispatch(getLeadsContent())
        fetchCustomer().then();
    }, [])



    const deleteCurrentLead = (index) => {
        dispatch(openModal({title : "Confirmation", bodyType : MODAL_BODY_TYPES.CONFIRMATION,
        extraObject : { message : `Etes vous sur de vouloir supprimer ce client ?`, type : CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, index}}))
    }

    return(
        <>
            
            <TitleCard title="Vos Clients" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

                {/* Leads List in table format loaded from slice after api call */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Nom Prénom</th>
                        <th>Email</th>
                        <th>Dernière commande</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            customers?.map((l, k) => {
                                return(
                                    <tr key={k}>
                                    <td><Avatar initial={l.email[0]} size="h-20 w-20" bgColor="bg-primary" textColor="text-white" /></td>
                                    <td>{l.firstname} {l.lastname}</td>
                                    <td>{l.email}</td>
                                    <td>{moment(new Date()).add(-5*(k+2), 'days').format("DD MMM YY")}</td>
                                    {/*<td><button className="btn btn-square btn-ghost" onClick={() => deleteCurrentLead(k)}><TrashIcon className="w-5"/></button></td>*/}
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


export default Clients