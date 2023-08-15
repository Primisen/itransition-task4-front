import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import Table from 'react-bootstrap/Table';
import moment from "moment";
import ToolBar from "./ToolBar";

const url = "http://34.116.171.214:4001/users";
const cookies = new Cookies();

export default function User() {

    const selectItems = document.getElementsByClassName('acc-item');

    function selectAll($event) {
        const isSelectorChecked = $event.target.checked;
        if (isSelectorChecked) {
            for (let item of selectItems) {
                item.checked = true;
            }
        } else {
            for (let item of selectItems) {
                item.checked = false;
            }
        }
    }

    const [users, setUsers] = useState([]);

    const headers = {'Authorization': 'Bearer ' + cookies.get("TOKEN")};

    function fetchUsers(headers) {
        fetch(url, {headers})
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
            });
    }

    useEffect(() => {
            fetchUsers(headers)
        },
        [])

    return (
        <div>
            <h1 className="text-center">User Component</h1>

            <ToolBar/>

            <Table Users>
                <thead>
                <tr>
                    <th>
                        <input onClick={selectAll} className="select-all" type="checkbox" name="acs1"/>
                    </th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Last login date</th>
                    <th>Registration Date</th>
                    <th>Status</th>
                </tr>
                </thead>

                <tbody>
                {users?.map((user) => {
                    return (
                        <tr>
                            <td>
                                <input className="acc-item" type="checkbox" name="acs" value={user.id}/>
                            </td>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.login}</td>
                            <td>{moment(user.lastLoginDate).format('DD/MM/YYYY')}</td>
                            <td>{moment(user.registrationDate).format('DD/MM/YYYY')}</td>
                            {user.isActive ? <td>active</td> : <td>block</td>}
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </div>
    );
}
