import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


function MyArtAndCraftList() {
    const { user } = useContext(AuthContext);
    const { email } = user;

    const [crafts, setCrafts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

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

    useEffect(() => {
        fetch(`https://wizarding-crafts-server.vercel.app/crafts/${email}`)
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

    if (crafts.length === 0) {
        return <>
            <section className="mx-5 md:mx-14 min-h-screen">
                <h1 className="text-3xl font-bold my-14 text-center">My Magical Creations</h1>
                <div className="text-center">
                    <h3>You haven't added any craft yet</h3>
                </div>
            </section>
        </>
    }

    return <>
        <section className="mx-5 md:mx-14 mb-14">
            <h1 className="text-3xl font-bold my-14 text-center">My Magical Creations</h1>
            <table className="table border w-full table-zebra text-xl">
                <tbody>
                    {crafts && crafts.map(craft => <tr key={craft._id} className="align-middle text-center">
                        <td className="craftBg w-40"><img src={craft.imageURL} alt="" /></td>
                        <td>
                            <div className="font-semibold">{craft.name}</div>
                            <div className="badge badge-accent badge-outline badge-lg mt-3 h-full">{craft.subcategory}</div> <br />
                            <div className="badge badge-outline badge-lg">Price: {craft.price} tk</div> <br />
                            <div className="badge badge-outline badge-lg">Rating : {craft.rating}<span className="material-symbols-outlined">star</span></div>
                        </td>
                        <td className="flex flex-col gap-5 items-center">
                            <Link to={`/craft/${craft._id}`} className="w-32 btn btn-outline mx-auto">View details</Link>
                            <Link to={`/edit-craft/${craft._id}`} className="w-32 btn btn-outline btn-success">Edit</Link>

                            <button onClick={() => handleRemove(craft._id)} className="w-32 btn btn-outline btn-error" >Remove</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </section>
    </>
}

export default MyArtAndCraftList;