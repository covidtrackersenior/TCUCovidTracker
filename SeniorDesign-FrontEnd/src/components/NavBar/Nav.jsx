import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav>
            <Link style={{ color: "white", textDecoration: "none" }} to="/">
                <div style={{ fontSize: "20px" }}>Covid Tracker</div>
            </Link>
            <ul className="nav-links">
                <Link
                    style={{
                        color: "white",
                        textDecoration: "none",
                        marginTop: "5px",
                        marginRight: "40px",
                        fontSize: "15px"
                    }}
                    to="/infos"
                >
                    <li>Infos</li>
                </Link>
                <Link
                    style={{
                        color: "white",
                        textDecoration: "none",
                        marginTop: "5px",
                        marginRight: "40px",
                        fontSize: "15px"
                    }}
                    to="/symptom"
                >
                    <li>Symptom</li>
                </Link>
                <Link
                    style={{
                        color: "white",
                        textDecoration: "none",
                        marginTop: "5px",
                        marginRight: "40px",
                        fontSize: "15px"
                    }}
                    to="/vaccine"
                >
                    <li>Vaccine</li>
                </Link>
                <Link
                    style={{ color: "white", textDecoration: "none", marginTop: "5px",fontSize: "15px" }}
                    to="/about"
                >
                    <li>About</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;
