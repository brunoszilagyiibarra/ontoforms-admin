// In sidenav.js
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import {NavLink} from "react-router-dom";
import React, {useState} from "react";
import styles from "./sidenav.module.css"
import HomeIcon from "@mui/icons-material/Home";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import AppsIcon from "@mui/icons-material/Apps";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Sidenav() {
    const [open, setopen] = useState(true)

    const toggleOpen = () => {
        setopen(!open)
    }

    return (
        <>
            <div id="sidebar">
                <div className={open ? styles.sidenav : styles.sidenavClosed}>
                    <button className={styles.menuBtn} onClick={toggleOpen}>
                        {open ? <KeyboardDoubleArrowLeftIcon/> : <KeyboardDoubleArrowRightIcon/>}
                    </button>
                    {navRoutes.map(item => {
                        return <NavLink key={item.id} className={styles.sideitem} to={item.link}>
                            {item.icon}
                            <span className={open ? styles.linkText : styles.linkTextClosed}>{item.text}</span>
                        </NavLink>
                    })}
                </div>
            </div>
        </>
    )
}

const navRoutes = [
    {
        id: 0,
        icon: <HomeIcon/>,
        text: "Inicio",
        link: "/"
    },
    {
        id: 1,
        icon: <AccountTreeIcon/>,
        text: "Ontologías",
        link: "ontologies"
    },
    {
        id: 2,
        icon: <ListAltIcon/>,
        text: "Formularios",
        link: "onto-forms"
    },
    {
        id: 3,
        icon: <PeopleIcon/>,
        text: "Usuarios",
        link: "users"
    },
    {
        id: 4,
        icon: <AppsIcon/>,
        text: "Aplicaciones",
        link: "applications"
    },
    {
        id: 5,
        icon: <SettingsIcon/>,
        text: "Configuraciones",
        link: "config"
    }
]