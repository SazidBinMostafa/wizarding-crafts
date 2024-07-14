import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import CraftCard from "../../Components/CraftCard/CraftCard";


function MyArtAndCraftList() {
    const { user } = useContext(AuthContext);
    const { email } = user;

    const [crafts, setCrafts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {crafts.map(craft => <CraftCard key={craft._id} craft={craft} crafts={crafts} setCrafts={setCrafts}></CraftCard>)}
            </div>
        </section>
    </>
}

export default MyArtAndCraftList;