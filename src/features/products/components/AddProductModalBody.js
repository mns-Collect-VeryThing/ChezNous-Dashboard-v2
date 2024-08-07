import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { useForm } from "react-hook-form"


function AddProductModalBody({closeModal}){
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)


    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Produit</span>
                    </div>
                    <input className="input input-bordered w-full"
                           defaultValue="chocolat" {...register("product", {required: true})}/><br/>
                        {errors.product && <span>Ce champs est requis</span>}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Prix</span>
                    </div>
                    <input className="input input-bordered w-full max-w-xs"
                           defaultValue="10" {...register("price", {required: true})}/><br/>
                    {errors.price && <span>Ce champs est requis</span>}
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Quantité</span>
                    </div>
                    <input className="input input-bordered w-full max-w-xs"
                           defaultValue="5" {...register("quantity", {required: true})}/><br/>
                    {errors.quantity && <span>Ce champs est requis</span>}
                </label>
                <div className="modal-action">
                    <input className="btn btn-primary px-6" type="submit"/>

                </div>
            </form>
        </>
    )
}

export default AddProductModalBody