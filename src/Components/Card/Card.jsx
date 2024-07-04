import { Link } from 'react-router-dom';
import './Card.css'
import PropTypes from 'prop-types';

function Card({craft}) {

    return <>
        <div id='card' className="card bg-base-100 w-80 border shadow-xl bg-center">
            <figure id='cardImage' className="px-10 pt-10">
                <img
                    src={craft.imageURL}
                    alt={`Image of ${craft.name}`}
                    className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{craft.name}</h2>
                <p>{craft.price} tk</p>
                <div className="card-actions">
                    <Link to={`http://localhost:5173/craft/${craft._id}`} className="btn btn-neutral">View details</Link>
                </div>
            </div>
        </div>
    </>
}

export default Card;


Card.propTypes = {
    craft: PropTypes.node,
}