import { Link } from 'react-router-dom';
import './Card.css'
import PropTypes from 'prop-types';

function Card({ craft }) {

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
                <div className="card-actions my-5">
                    <Link to={`/craft/${craft._id}`} className="btn btn-outline mx-auto">View details</Link>
                </div>
            </div>
        </div>
    </>
}

export default Card;


Card.propTypes = {
    craft: PropTypes.node,
}