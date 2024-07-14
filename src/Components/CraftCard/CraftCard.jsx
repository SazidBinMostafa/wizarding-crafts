import { Link } from 'react-router-dom';
import './Card.css'
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

function CraftCard({ craft, crafts, setCrafts }) {

    const handleRemove = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://wizarding-crafts-server.vercel.app/craft/${_id}`, {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json'
                    },
                })
                    .then(res => res.json())
                    .then(({ deletedCount }) => {
                        if (deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            const remainingCrafts = crafts.filter(c => c._id !== _id)
                            setCrafts(remainingCrafts)
                        }
                    })

            }
        });


    }

    const {name, imageURL, rating, customization, stockStatus,
    } = craft;

    return <>
        <div className="card border bg-base-100 shadow-xl font-semibold w-96">
            <figure id='cardImage' className='bg-center h-96'>
                <img className='w-60'
                    src={imageURL}
                    alt="Movie" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className='flex items-center'>Rating: {rating} <span className="material-symbols-outlined">star</span></p>
                <p>Price: {craft.price} tk</p>
                <p>Customization: {customization}</p>
                <p>stockStatus: <span className={stockStatus === "In stock" ? 'text-green-500' : ''}>{stockStatus}</span></p>
                <div className="card-actions my-5 flex">
                    <Link to={`/craft/${craft._id}`} className="btn btn-outline">View details</Link>
                    <Link to={`/edit-craft/${craft._id}`} className="btn btn-outline btn-success">Edit</Link>
                    <button onClick={() => handleRemove(craft._id)} className="btn btn-outline btn-error" >Remove</button>
                </div>
            </div>
        </div>
    </>
}

export default CraftCard;


CraftCard.propTypes = {
    craft: PropTypes.node,
}