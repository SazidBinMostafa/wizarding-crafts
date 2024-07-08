import { Link } from 'react-router-dom';
import './Card.css'
import PropTypes from 'prop-types';

function Card({craft}) {

    const { name, imageURL, subcategory, description, price, rating, customization, processingTime, stockStatus, userEmail, userName
    } = craft;

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
                <p>{craft.price} tk</p>
                <p>Customization: {customization}</p>
                <p>stockStatus: <span className='text-green-600'>{stockStatus}</span></p>
                <div className="card-actions">
                    <Link to={`http://localhost:5173/craft/${craft._id}`} className="btn btn-outline">View details</Link>
                    <Link to={`http://localhost:5173/craft/${craft._id}`} className="btn btn-outline btn-success">Edit</Link>
                    <btn className="btn btn-outline btn-error">Remove</btn>
                </div>
            </div>
        </div>
    </>
}

export default Card;


Card.propTypes = {
    craft: PropTypes.node,
}