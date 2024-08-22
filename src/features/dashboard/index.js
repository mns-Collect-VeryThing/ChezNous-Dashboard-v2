import DashboardStats from './components/DashboardStats'
import AmountStats from './components/AmountStats'
import PageStats from './components/PageStats'

import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon  from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon  from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon  from '@heroicons/react/24/outline/CreditCardIcon'
import UserChannels from './components/UserChannels'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import {showNotification} from '../common/headerSlice'
import DoughnutChart from './components/DoughnutChart'
import {useEffect, useState} from 'react'
import {ShoppingCartIcon} from "@heroicons/react/20/solid";
import {getCustomerByShop} from "../../service/customerService";
import {getLeadsContent} from "../clients/leadSlice";
import {getStatsByShop} from "../../service/shopService";

function Dashboard(){

    const dispatch = useDispatch();

    const [stats, setStats] = useState([])

    const fetchStats = async () => {
        const response = await getStatsByShop({shopId : localStorage.getItem('shopId')});
        let tmpStats = [];
        tmpStats = [...tmpStats, {title : "Nombre de client", value : response.totalOrders, icon : <CreditCardIcon className='w-8 h-8'/>, description : "Depuis le début"}];
        setStats(tmpStats);
    };

    useEffect(() => {
        fetchStats().then();
    }, []);

    console.log(stats)
 

    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({message : `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status : 1}))
    }

    return(
        <>
        {/** ---------------------- Select Period Content ------------------------- */}
            <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod}/>
        
        {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-3 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    stats.map((d, k) => {
                        return (
                            <DashboardStats key={k} {...d} colorIndex={k}/>
                        )
                    })
                }
            </div>



        {/** ---------------------- Different charts ------------------------- */}
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <LineChart />
                <BarChart />
            </div>

        {/** ---------------------- Different stats content 2 ------------------------- */}
        
            {/*<div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">*/}
            {/*    <AmountStats />*/}
            {/*    <PageStats />*/}
            {/*</div>*/}

        {/** ---------------------- User source channels table  ------------------------- */}
        
        {/*    <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">*/}
        {/*        <UserChannels />*/}
        {/*        <DoughnutChart />*/}
        {/*    </div>*/}
        </>
    )
}

export default Dashboard