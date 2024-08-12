import {useEffect, useState} from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import {setPageTitle, showNotification} from "../../common/headerSlice"
import { useForm } from "react-hook-form"
import {addProduct, getProduct, getProducts, updateProduct} from "../../../service/productService";


function AddProductModalBody({closeModal, extraObject}){
    const { register, formState: { errors }, handleSubmit, reset } = useForm({
        defaultValues: {
            name: '',
            price: '',
            quantity: '',
            id: '',
        },
    });

    // const onSubmit = async (data) => await addProduct(data).then(() => closeModal());
    const onSubmit = async (data) => {
        if (data.id) {
            await updateProduct(data).then(() => closeModal());
        } else {
            await addProduct(data).then(() => closeModal());
        }
    };

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState(null);


    const fetchOrder = async (id) => {
        try {
            setLoading(true);
            const data = await getProduct(id);
            setProduct(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (product) {
            reset(product);
        }
    }, [product])

    useEffect(() => {
        if (extraObject.id) {
            fetchOrder(extraObject.id).then();
        }
    }, [])


    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Produit</span>
                    </div>
                    <input className="input input-bordered w-full"
                           {...register("name", {required: true})}/><br/>
                        {errors.name && <span>Ce champs est requis</span>}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">price</span>
                    </div>
                    <input className="input input-bordered w-full max-w-xs"
                           {...register("price", {required: true})}/><br/>
                    {errors.price && <span>Ce champs est requis</span>}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Quantité</span>
                    </div>
                    <input className="input input-bordered w-full max-w-xs"
                           {...register("quantity", {required: true})}/><br/>
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