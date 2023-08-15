import React from "react";
import Cookies from "universal-cookie";
import {Button, ButtonGroup} from "react-bootstrap";

const url = "http://localhost:4001/users";
const cookies = new Cookies();
export default function ToolBar() {

    const headers = {'Authorization': 'Bearer ' + cookies.get("TOKEN"), 'Content-Type': 'application/json'};

    function block() {
        let id = [];
        [...document.querySelectorAll('input[name="acs"]:checked')]
            .forEach((cb) => id.push(cb.value));
        let body = JSON.stringify({
            id: id,
            isActive: false
        })
        fetch(url, {headers: headers, method: "PUT", body: body})
            .then((response) => {
                id.map((i) => {
                    if (cookies.get("USER_ID") == i) {
                        cookies.remove("TOKEN");
                    }
                })
            });
    }

    function remove() {
        let id = [];
        [...document.querySelectorAll('input[name="acs"]:checked')]
            .forEach((cb) => id.push(cb.value));
        let body = JSON.stringify({
            id: id
        })
        fetch(url, {headers: headers, method: "DELETE", body: body});
    }

    function unblock() {
        let id = [];
        [...document.querySelectorAll('input[name="acs"]:checked')]
            .forEach((cb) => id.push(cb.value));
        let body = JSON.stringify({
            id: id,
            isActive: true
        })
        fetch(url, {headers: headers, method: "PUT", body: body});
    }

    return (
        <>
            <ButtonGroup aria-label="Basic example">
                <Button variant={"success"} onClick={unblock}>Unblock</Button>
                <Button variant={"warning"} onClick={block}>Block</Button>
                <Button variant={"danger"} onClick={remove}>Delete</Button>
            </ButtonGroup>
        </>
    )
}
