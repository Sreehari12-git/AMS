import { NavLink, useNavigate } from "react-router-dom"
import "./HRSidebar.css"

const HRSidebar = () => {
    const navigate = useNavigate();
    
    function logout() {
        localStorage.clear();
        navigate("/");
    }
    return(
        <div className="hr-sidebar">
        <h2 className="hr-logo">AMS</h2>
        <nav className="hr-nav-links">
            <NavLink to="leave-request" className={({isActive}) => isActive ? "active-link" : ""}>Leave Request</NavLink>
        </nav>
        <button className="hr-logout-btn" onClick={logout}>Logout</button>
        </div>
    )
}

export default HRSidebar