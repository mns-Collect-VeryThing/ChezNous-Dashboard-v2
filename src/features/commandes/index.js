import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../../components/Input/SearchBar"
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import {EyeIcon} from "@heroicons/react/20/solid";
import {openModal} from "../common/modalSlice";
import {CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES} from "../../utils/globalConstantUtil";
import {getCustomerByShop} from "../../service/customerService";
import {getLeadsContent} from "../clients/leadSlice";
import {getOrdersByShop} from "../../service/orderService";
import Avatar from "../../components/Avatar";

const TopSideButtons = ({removeFilter, applyFilter, applySearch}) => {

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")
    const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"]

    const showFiltersAndApply = (params) => {
        applyFilter(params)
        setFilterParam(params)
    }

    const removeAppliedFilter = () => {
        removeFilter()
        setFilterParam("")
        setSearchText("")
    }

    useEffect(() => {
        if(searchText == ""){
            removeAppliedFilter()
        }else{
            applySearch(searchText)
        }
    }, [searchText])

    return(
        <div className="inline-block float-right">
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText}/>
            {filterParam != "" && <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">{filterParam}<XMarkIcon className="w-4 ml-2"/></button>}
            <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-sm btn-outline"><FunnelIcon className="w-5 mr-2"/>Filter</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52">
                    {
                        locationFilters.map((l, k) => {
                            return  <li key={k}><a onClick={() => showFiltersAndApply(l)}>{l}</a></li>
                        })
                    }
                    <div className="divider mt-0 mb-0"></div>
                    <li><a onClick={() => removeAppliedFilter()}>Remove Filter</a></li>
                </ul>
            </div>
        </div>
    )
}


function Commandes(){

    const [orders, setOrders] = useState(null)


    const fetchOrders = async () => {
        const response = await getOrdersByShop({shopId : localStorage.getItem('shopId')});
        setOrders(response);
    };

    const { isOpen, title, bodyType } = useSelector((state) => state.modal);

    useEffect(() => {
        fetchOrders().then();
    }, [isOpen]);

    const removeFilter = () => {
    }

    const applyFilter = (params) => {

    }

    // Search according to name
    const applySearch = (value) => {

    }

    const getDummyStatus = (index) => {
        if(index === 'payed')return <div className="badge badge-error">A expedier</div>
        else return <div className="badge badge-secondary">{index}</div>
    }

    const dispatch = useDispatch()

    const openOrderModal = (index) => {
        dispatch(openModal({title : "Détails", bodyType : MODAL_BODY_TYPES.ORDER, extraObject : {orderDetail: orders[index]}}))
    }

    return(
        <>
            
            <TitleCard title="Vos commandes" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter}/>}>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email Id</th>
                        <th>Montant</th>
                        <th>Nombre de produit</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((l, k) => {
                                return(
                                    <tr key={k}>
                                        <td><Avatar initial={l.userId[0]} size="h-20 w-20" bgColor="bg-primary"
                                                    textColor="text-white"/></td>
                                        <td>{l.userId}</td>
                                        <td>${l.cart.totalPrice}</td>
                                        <td>{l.cart.products.length}</td>
                                        <td>{getDummyStatus(l.status)}</td>
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


export default Commandes