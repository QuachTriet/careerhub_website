import logo from "../../static/logo.png";
import "../Style/Layout.scss";
import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <footer className="footer">
            <div className="top">
                <div className="brand">
                    <img src={logo} alt="Career Hub Logo" />
                    <p>Career Hub - Nơi kết nối ứng viên và nhà tuyển dụng</p>
                </div>

                <div className="links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/jobs">Jobs</Link></li>
                        <li><Link to="/application">Applications</Link></li>
                    </ul>
                </div>

                <div className="policy">
                    <h4>Policies</h4>
                    <ul>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>

            <div className="bottom">
                <p>© {new Date().getFullYear()} Career Hub. All rights reserved.</p>
            </div>
        </footer>
    );
};


export default Footer;