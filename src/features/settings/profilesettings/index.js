import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import InputText from '../../../components/Input/InputText'
import TextAreaInput from '../../../components/Input/TextAreaInput'
import ToogleInput from '../../../components/Input/ToogleInput'
import {getLogedUser} from "../../../service/userService";

function ProfileSettings(){

    const [user, setUser] = useState(null)

    useEffect(() => {
        getUser().then()
    },[])

    const getUser = async () => {
        const response = await getLogedUser();
        setUser(response.data);
    }

    return(
        <>
            <TitleCard title="Profile utilisateur" topMargin="mt-2">
                {user ? <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <span>Shop : {user.shop.name}</span>
                        <span>Email : {user.owner.email}</span>
                        <span>Prébom : {user.owner.firstname}</span>
                        <span>Nom : {user.owner.lastname}</span>
                    </div>
                </> : <></>}

            </TitleCard>
        </>
    )
}


export default ProfileSettings