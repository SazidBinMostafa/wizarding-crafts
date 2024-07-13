import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";


function EditCraftItem() {

    const { user } = useContext(AuthContext)
    const { displayName, email } = user;
    const {id} = useParams();
    const navigate = useNavigate();

    const loadedCraft = useLoaderData();

    const [craft, setCraft] = useState(loadedCraft)

    const { name, imageURL, subcategory, description, price, rating, customization, processingTime, stockStatus
    } = craft;


    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const imageURL = form.imageURL.value;
        const subcategory = form.subcategory.value;
        const description = form.description.value;
        const price = form.price.value;
        const rating = form.rating.value;
        const customization = form.customization.value;
        const processingTime = form.processingTime.value;
        const stockStatus = form.stockStatus.value;
        const userEmail = form.userEmail.value;
        const userName = form.userName.value;


        const updatedCraftItem = { name, imageURL, subcategory, description, price, rating, customization, processingTime, stockStatus, userEmail, userName };


        fetch(`http://localhost:5000/craft/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedCraftItem)
        })
            .then(res => res.json())
            .then(({ modifiedCount }) => {
                if (modifiedCount > 0) {
                    setCraft(updatedCraftItem)
                    navigate(`/mycrafts/${email}`)
                    Swal.fire({
                        title: 'Success!',
                        text: 'You have successfully updated the item',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                }
            })

        form.reset()


    }
    const handleGoBack = () =>{
        navigate(-1)
    }

    return <>
        <div className="font-bold py-5"><button onClick={handleGoBack} className="flex items-cente gap-1" to='/crafts'><span className="material-symbols-outlined">arrow_back</span>Go back</button></div>
        <section className="mb-14">
            <div className='bg-[#F4F3F0] p-5 lg:p-14 text-center w-fit mx-auto rounded-3xl'>
                <div className=' max-w-3xl mb-5'>
                    <h3 className='text-3xl font-bold mb-3'>Update Craft Item</h3>
                    <p>Update a craft item of your list</p>
                </div>
                <form onSubmit={handleSubmit} className='max-w-3xl'>
                    <div>
                        <div className='md:flex gap-5 w-full'>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Name</span>
                                </div>
                                <input defaultValue={name} required name='name' type="text" placeholder="Enter craft item name" className="input input-bordered w-full" />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Subcategory Name</span>
                                </div>
                                <input defaultValue={subcategory} required name='subcategory' type="text" placeholder="Enter subcategory name" className="input input-bordered w-full" />
                            </label>
                        </div>
                        <label className="form-control w-full col-span-2">
                            <div className="label">
                                <span className="label-text">Photo URL</span>
                            </div>
                            <input defaultValue={imageURL} required name='imageURL' type="text" placeholder="Enter photo URL" className="input input-bordered w-full" />
                        </label>
                        <div className='md:flex gap-5 w-full'>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Price</span>
                                </div>
                                <input defaultValue={price} required name='price' type="text" placeholder="Price" className="input input-bordered w-full" />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Processing Time</span>
                                </div>
                                <input defaultValue={processingTime} required name='processingTime' type="text" placeholder="Enter processing time" className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className='md:flex gap-5 w-full'>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Customization</span>
                                </div>
                                <select defaultValue={customization} required name="customization" className="select select-bordered w-full max-w-xs">
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Stock Status</span>
                                </div>
                                <select defaultValue={stockStatus} required name="stockStatus" className="select select-bordered w-full max-w-xs">
                                    <option>In stock</option>
                                    <option>Made to order</option>
                                </select>
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Rating</span>
                                </div>
                                <select required defaultValue={rating} name="rating" className="select select-bordered w-full max-w-xs">
                                    <option>5</option>
                                    <option>4</option>
                                    <option>3</option>
                                    <option>2</option>
                                    <option>1</option>
                                </select>
                            </label>
                        </div>
                        <div className='md:flex gap-5 w-full'>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">User Name</span>
                                </div>
                                <div className="border border-gray-300 rounded-lg">
                                    <div className="border border-gray-300 rounded-lg">
                                    <input disabled required defaultValue={displayName} name='userName' type="text" placeholder="Enter your user name" className="input input-bordered w-full" />
                                    </div>
                                </div>
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">User Email</span>
                                </div>
                                <div className="border border-gray-300 rounded-lg">
                                    <input disabled required defaultValue={email} name='userEmail' type="email" placeholder="Enter your user email" className="input input-bordered w-full" />
                                </div>
                            </label>
                        </div>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Description</span>
                            </div>
                            <textarea defaultValue={description} required name='description' type="text" placeholder="Write a short description" className="textarea textarea-bordered w-full" />
                        </label>
                    </div>
                    <input className='btn btn-block btn-neutral mt-5' type="submit" value="Update" />
                </form>
            </div>
        </section>
    </>
}

export default EditCraftItem;