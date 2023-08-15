import React, {useState} from 'react'
import {Form, Button} from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import JwtDecode from "jwt-decode";

export default function Login() {

    const cookies = new Cookies();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [signup, setSignup] = useState(false);

    const handleSubmit = (e) => {

        const configuration = {
            method: "post",
            url: "http://localhost:4001/login",//
            data: {
                login,
                password,
            },
        };

        axios(configuration)
            .then((result) => {
                setSignup(true);

                cookies.set("TOKEN", result.data.token, {
                    path: "/",
                });
                const user = JwtDecode(result.data.token);
                cookies.set("USER_ID", user.id);
                window.location.href = "/users";
            })
            .catch((error) => {
                error = new Error();
            });

        e.preventDefault();
    }

    return (
        <>
            <h2>Login</h2>
            <Form onSubmit={(e) => handleSubmit(e)}>

                {signup ? (
                    <p className="text-success">You Are Logged in Successfully</p>
                ) : (
                    <p className="text-danger">You Are Not Logged in</p>
                )}

                {/* email */}
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder="Enter email"
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                >
                    Login
                </Button>
            </Form>
        </>
    )
}