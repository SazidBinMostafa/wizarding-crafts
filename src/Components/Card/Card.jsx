import { Link } from 'react-router-dom';
import './Card.css'
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

function Card({ craft, crafts, setCrafts }) {

    const { _id, name, imageURL, subcategory, description, price, rating, customization, processingTime, stockStatus, userEmail, userName
    } = craft;

    const handleRemove = () => {
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
                fetch(`http://localhost:5000/craft/${_id}`, {
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

    return <>
        <div className="card border bg-base-100 shadow-xl font-semibold w-fit">
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
                <div className="card-actions my-5">
                    <Link to={`http://localhost:5173/craft/${craft._id}`} className="btn btn-outline">View details</Link>
                    <Link to={`http://localhost:5173/edit-craft/${craft._id}`} className="btn btn-outline btn-success">Edit</Link>
                    <button onClick={handleRemove} className="btn btn-outline btn-error" >Remove</button>
                </div>
            </div>
        </div>
    </>
}

export default Card;


Card.propTypes = {
    craft: PropTypes.node,
}