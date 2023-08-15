import React from "react";
import Cookies from "universal-cookie";
import {Navigate} from "react-router-dom";

const cookies = new Cookies();
export default function LogOut() {

    cookies.remove("TOKEN");

    return (
        <Navigate to="/" ></Navigate>
    );
}
