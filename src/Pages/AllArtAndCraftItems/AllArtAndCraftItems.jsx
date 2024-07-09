import { useEffect, useState } from "react";
import './AllArtAndCraftItems.css'
import { Link } from "react-router-dom";



function AllArtAndCraftItems() {

    const [crafts, setCrafts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/crafts')
            .then(res => res.json())
            .then(data => {
                setCrafts(data)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <div className="w-full h-screen flex items-center justify-center">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }

    return <>
        <section className="mx-5 md:mx-42 lg:mx-32">
        <h1 className="text-3xl font-bold my-14 text-center">Magical Creations: Browse All Crafts Items</h1>
            <table className="table border w-full table-zebra text-xl">
                <tbody>
                    {crafts && crafts.map(craft => <tr key={craft._id} className="align-middle text-center">
                        <td className="craftBg w-40"><img src={craft.imageURL} alt="" /></td>
                        <td>{craft.name}</td>
                        <td><Link className="btn btn-outline" to={`/craft/${craft._id}`}>View Details</Link></td>
                    </tr>)}
                </tbody>
            </table>
    </section>
    </>
}

export default AllArtAndCraftItems;