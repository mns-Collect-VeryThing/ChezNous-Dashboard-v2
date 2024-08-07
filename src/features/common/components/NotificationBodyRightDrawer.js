function NotificationBodyRightDrawer(){
    return(
        <>
             {
                [...Array(4)].map((_, i) => {
                    return <div key={i} className={"grid mt-3 card bg-base-200 rounded-box p-3" + (i < 5 ? " bg-blue-100" : "")}>
                            {i % 2 === 0 ? `Une nouvelle commande à était faites, veuillez l'expédier` : `La commande XXX a était recue `}
                        </div> 
                })
            }
        </>
    )
}

export default NotificationBodyRightDrawer