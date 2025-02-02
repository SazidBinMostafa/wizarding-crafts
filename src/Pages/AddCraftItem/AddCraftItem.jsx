import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip'


function AddCraftItem() {

    const { user } = useContext(AuthContext)
    const { displayName, email } = user;


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


        const newItem = { name, imageURL, subcategory, description, price, rating, customization, processingTime, stockStatus, userEmail, userName };


        fetch('https://wizarding-crafts-server.vercel.app/crafts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newItem)
        })
            .then(res => res.json())
            .then(({ insertedId }) => {
                if (insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'You have successfully added an item',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                }
            })

        form.reset()


    }

    return <>
        <Tooltip id="my-tooltip" />
        <section className="mb-14">
            <div className='bg-[#F4F3F0] p-5 lg:p-14 text-center w-fit mx-auto rounded-3xl'>
                <div className=' max-w-3xl mb-5'>
                    <h3 className='text-3xl font-bold mb-3'>Add New Craft Item</h3>
                    <p>Add a new craft item to your list</p>
                </div>
                <form onSubmit={handleSubmit} className='max-w-3xl'>
                    <div>
                        <div className='md:flex gap-5 w-full'>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Name</span>
                                </div>
                                <input required name='name' type="text" placeholder="Enter craft item name" className="input input-bordered w-full" />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Subcategory Name</span>
                                </div>
                                <input required name='subcategory' type="text" placeholder="Enter subcategory name" className="input input-bordered w-full" />
                            </label>
                        </div>
                        <label className="form-control w-full col-span-2">
                            <div className="label">
                                <span className="label-text">Photo URL</span>
                            </div>
                            <input required name='imageURL' type="text" placeholder="Enter photo URL" className="input input-bordered w-full" />
                        </label>
                        <div className='md:flex gap-5 w-full'>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Price</span>
                                </div>
                                <input required name='price' type="text" placeholder="Price" className="input input-bordered w-full" />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Processing Time</span>
                                </div>
                                <input required name='processingTime' type="text" placeholder="Enter processing time" className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className='md:flex gap-5 w-full'>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Customization</span>
                                </div>
                                <select required name="customization" className="select select-bordered w-full max-w-xs">
                                    <option selected>Yes</option>
                                    <option>No</option>
                                </select>
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Stock Status</span>
                                </div>
                                <select required name="stockStatus" className="select select-bordered w-full max-w-xs">
                                    <option selected>In stock</option>
                                    <option>Made to order</option>
                                </select>
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Rating</span>
                                </div>
                                <select required name="rating" className="select select-bordered w-full max-w-xs">
                                    <option selected>5</option>
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
                                <a
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content={displayName}
                                    data-tooltip-place="top"
                                >
                                    <div className="border border-gray-300 rounded-lg">
                                        <input disabled required defaultValue={displayName} name='userName' type="text" placeholder="Enter your user name" className="input input-bordered w-full" />
                                    </div>
                                </a>
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">User Email</span>
                                </div>
                                <a
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content={email}
                                    data-tooltip-place="top"
                                >
                                
                                <div className="border border-gray-300 rounded-lg">
                                    <input disabled required defaultValue={email} name='userEmail' type="email" placeholder="Enter your user email" className="input input-bordered w-full" />
                                </div>
                                </a>
                            </label>
                        </div>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Description</span>
                            </div>
                            <textarea required name='description' type="text" placeholder="Write a short description" className="textarea textarea-bordered w-full" />
                        </label>
                    </div>
                    <input className='btn btn-block btn-neutral mt-5' type="submit" value="Add" />
                </form>
            </div>
        </section>
    </>
}

export default AddCraftItem;