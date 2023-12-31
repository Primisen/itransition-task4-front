import React, {useState} from 'react'
import {Form, Button} from "react-bootstrap";
import axios from "axios";

export default function Register() {

    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [registerMessage, setRegisterMessage] = useState("");

    const handleSubmit = (e) => {
        const configuration = {
            method: "post",
            url: "http://34.116.171.214:4001/registration",
            data: {
                name,
                login,
                password,
            },
        };

        axios(configuration)
            .then((result) => {
                setRegisterMessage(result.data);
            })
            .catch((error) => {
                setRegisterMessage(error.response.data);
            });
        e.preventDefault();
    }

    return (

        <>
            <h2>Registration</h2>
            <Form onSubmit={(e) => handleSubmit(e)}>

                <p>{registerMessage}</p>

                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder="Enter email"/>
                </Form.Group>

                {/* password */}
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"/>
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                >
                    Register
                </Button>
            </Form>
        </>
    )
}