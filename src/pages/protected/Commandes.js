import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Commandes from '../../features/commandes'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Commandes"}))
      }, [])


    return(
        <Commandes />
    )
}

export default InternalPage