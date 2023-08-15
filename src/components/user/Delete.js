import React from "react";
import Cookies from "universal-cookie";
import {Button} from "react-bootstrap";

const url = "http://localhost:4001/users";
const cookies = new Cookies();
export default function Delete() {

    const headers = {'Authorization': 'Bearer ' + cookies.get("TOKEN"), 'Content-Type': 'application/json'};

    function remove() {
        let id = [];

        [...document.querySelectorAll('input[name="acs"]:checked')]
            .forEach((cb) => id.push(cb.value));

        let obj = new Object();
        obj["id"] = id;

        let body = JSON.stringify({
            id: id
        })

        fetch(url, {headers: headers, method: "DELETE", body: body})
            .then((response) => console.log("way")
            );


    }

    return (
        <Button variant={"danger"} onClick={remove}>Delete</Button>
    );
}
