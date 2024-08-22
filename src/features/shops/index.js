import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { getShops } from "../../service/shopService";


function Shops(){

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shops, setShops] = useState([]);

    const { isOpen, title, bodyType } = useSelector((state) => state.modal);

    useEffect(() => {
        fetchOrders().then();
    }, [isOpen]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await getShops();
            setShops(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };



    const getStock = (index) => {
        if(index > 5)return <div className="badge badge-success">En stock</div>
        else if(index == 0 )return <div className="badge badge-error">Rupture</div>
        else return <div className="badge badge-warning">Stock faible</div>
    }

    const dispatch = useDispatch()

    return(
        <>
            <TitleCard title="Nos clients" topMargin="mt-2">

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Nom de l'entreprise</th>
                        <th>Nom du responsable</th>
                        <th>Date d'inscription</th>
                        <th>Status</th>
                        <th>Thème</th>
                        <th>Port utilisé</th>
                    </tr>
                    </thead>
                    {loading ? <div className="loading">Loading&#8230;</div> : (
                    <tbody>
                        {
                            shops.map((l, k) => {
                                return(
                                    <tr key={k}>
                                        <td>{l.name}</td>
                                        <td>{l.owner?.firstname} {l.owner?.lastname}</td>
                                        <td>{l.owner?.email}</td>
                                        <td>{l.status}</td>
                                        <td>300{k}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    )}
                </table>
            </div>
            </TitleCard>
        </>
    )
}


export default Shops