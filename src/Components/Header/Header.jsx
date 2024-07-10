import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";


function Header() {

    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
    }

    const NavLinks = () => {
        return <>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/crafts'>All Art & craft Items</NavLink></li>
            {user ? <>
            <li><NavLink to='/add-craft'>Add Craft Item</NavLink></li>
            <li><NavLink to={`/mycrafts/${user.email}`}>My Art & Craft List</NavLink></li>
            </> : <></>}
        </>
    }

    return <>
        <nav>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                            <NavLinks></NavLinks>
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost text-xl">Wizarding Crafts</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <NavLinks></NavLinks>
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="z-50 menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
                            <li><Link>Profile</Link></li>
                            <li><Link>Settings</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div> : <Link to='/login' className="btn">Login</Link>
                    }
                </div>
            </div>
        </nav>
    </>
}

export default Header;