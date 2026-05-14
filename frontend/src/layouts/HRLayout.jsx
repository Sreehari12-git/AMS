import { Outlet } from "react-router-dom"
import HRSidebar from "../components/HRSidebar"
import "./HRLayout.css"

const HRLayout = () => {
    return(
        <div className="hr-layout">
            <HRSidebar/>
            <Outlet/>
        </div>
    )
}

export default HRLayout