import React from "react";
import Cookies from "universal-cookie";
import {Button} from "react-bootstrap";
const url = "http://localhost:4001/users";
const cookies = new Cookies();
export default function BlockUserComponent() {

    const headers = {'Authorization': 'Bearer ' + cookies.get("TOKEN"), 'Content-Type': 'application/json'};

    function unblock() {
        let id = [];

        [...document.querySelectorAll('input[name="acs"]:checked')]
            .forEach((cb) => id.push(cb.value));

        let obj = new Object();
        obj["id"] = id;

        let body = JSON.stringify({
            id: id,
            isActive: true
        })

        fetch(url, {headers: headers, method: "PUT", body: body})
            .then((response) => console.log("way")
            );
    }

    return (
            <Button variant={"success"} onClick={unblock}>Unblock</Button>
    );
}
