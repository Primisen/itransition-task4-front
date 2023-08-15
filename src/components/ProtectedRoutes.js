import React from "react";
import {Navigate} from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export function ProtectedRoutes({children}) {
    const auth = cookies.get("TOKEN");
    return auth ? <>{children}</> : <Navigate to="/"/>;
}
