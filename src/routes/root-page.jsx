import Sidenav from "./sidenav";
import {Outlet} from "react-router-dom";
import "./root-page.css"


export default function RootPage() {
    return (
        <div id="container" className="container">
            <div id="Sidenav" className="flex-item">
                <Sidenav/>
            </div>
            <div id="child-detail" className="flex-item">
                <Outlet/>
            </div>
        </div>
    )
}