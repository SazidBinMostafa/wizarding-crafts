import { Link, useLoaderData } from "react-router-dom";
import './Craft.css'


function Craft() {

    const craft = useLoaderData();
    const { name, imageURL, subcategory, description, price, rating, customization, processingTime, stockStatus, userEmail, userName
    } = craft;
    return <>
        <div className="bg-base-200 font-bold py-5"><Link className="flex items-cente gap-1" to='/crafts'><span className="material-symbols-outlined">arrow_back</span>Go back</Link></div>
        <div className="hero bg-base-200 min-h-screen px-5 md:px-14 lg:px-32">
            <div className="hero-content flex-col lg:flex-row">
                <div id="craftImage" className="bg-center">
                <img
                    src={imageURL}
                    className="max-w-sm rounded-lg shadow-2xl bg-center" />
                </div>
                <div className="font-semibold">
                    <h1 className="text-3xl font-bold">{name}</h1>
                    <p className="py-3 my-3 border-y border-black">
                        {description}
                    </p>
                    <div className="mb-3 pb-3 border-b border-black flex flex-col md:flex-row gap-5">
                    <p>Subcategory: <div className="badge badge-primary badge-outline">{subcategory}</div></p>
                    <p>Customization: <div className="badge badge-outline">{customization}</div></p>
                    <p>Stock Status: <div className="badge badge-success badge-outline">{stockStatus}</div></p>
                    </div>
                    <div className="mb-3 pb-3 border-b border-black flex flex-col md:flex-row gap-5">
                    <p>Price: <div className="badge badge-success badge-outline">{price} tk</div></p>
                    <p>Processing Time: <div className="badge badge-outline">{processingTime}</div></p>
                    </div>
                    <button className="btn btn-neutral">Buy</button>
                </div>
            </div>
        </div>
    </>
}

export default Craft;