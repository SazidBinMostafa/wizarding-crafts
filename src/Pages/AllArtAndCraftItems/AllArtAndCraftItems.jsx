import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";


function AllArtAndCraftItems(){

    const [crafts, setCrafts] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/crafts')
        .then(res=> res.json())
        .then(data=> setCrafts(data))
    }, [])
    
    return <section className="mx-5 md:mx-42 lg:mx-32">
        <h1 className="text-3xl font-bold my-14 text-center">Magical Creations: Browse All Crafts Items</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 w-fit mx-auto">
            {crafts && crafts.map(craft=><Card key={craft._id} craft={craft}></Card>)}
        </div>
    </section>
}

export default AllArtAndCraftItems;