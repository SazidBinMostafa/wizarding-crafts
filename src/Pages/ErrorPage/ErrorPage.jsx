import { Link } from "react-router-dom"
import { useEffect } from "react";

function ErrorPage() {

    useEffect(()=>{
        document.title = "404 - Page Not Found";
    },[])

    return <>
        <section className="relative">
            <img className="w-full" src="https://irs.www.warnerbros.com/gallery-v2-jpeg/harry_potter_and_the_goblet_of_fire_photo_2-414763965.jpg" alt="" />
            <div className="absolute top-1 text-white lg:top-[35%] text-center w-full">
                <h1 className="text-3xl lg:text-5xl font-semibold mb-3 lg:mb-5">Ooops... 404</h1>
                <h1 className="text-3xl lg:text-5xl font-bold mb-3 lg:mb-5">What are you doing here???</h1>
                <Link className="btn" to='/'>Go back to home</Link>
            </div>
        </section>
    </>
}

export default ErrorPage;