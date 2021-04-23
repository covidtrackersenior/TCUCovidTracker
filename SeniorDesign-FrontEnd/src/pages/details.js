import React from "react";
import { Combine } from "../components";
import styles from "../App.module.css";
const details = ({ state: { id, name, color } }) => {
    return ( <
        div className = { styles.container } >
        <
        p > { id } < /p>

        <
        /div>
    );
};
export default details;