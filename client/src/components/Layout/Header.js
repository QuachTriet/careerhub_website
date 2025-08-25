import { useEffect, useState } from "react";
import logo from "../../static/logo.png";
import "../Style/Layout.scss";
import { Link, useNavigate } from 'react-router-dom';
import cookie from "js-cookie";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        const token = cookie.get("access-token");
        setUser(token ? { token } : "");

    }, [])

    const handleLogout = () => {
        cookie.remove("access-token");
        setUser(null);
        navigate("/");
    }

    return (
        <nav className="header">
            <div className="detail">
                <img src={logo} alt="Career Hub Logo" />
                <p>Career Hub</p>
            </div>
            <ul className="menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/application">Applications</Link></li>
                {user ? (
                    <li className="user-menu">
                        <button onClick={() => setOpenMenu(!openMenu)} className="user-btn">
                            <FaUserCircle size={24} />
                        </button>

                        {openMenu && (
                            <ul className="dropdown">
                                <li><Link to="/profile">Profile</Link></li>
                                <li><Link onClick={handleLogout}>Logout</Link></li>
                            </ul>
                        )}
                    </li>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}

            </ul>
        </nav>
    );
};


export default Header;