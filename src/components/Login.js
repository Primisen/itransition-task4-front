import React, {useState} from 'react'
import {Form, Button} from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";


export default function Login() {

    const cookies = new Cookies();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [signup, setSignup] = useState(false);

    const handleSubmit = (e) => {

        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:4001/login",//
            data: {
                login,
                password,
            },
        };

        // make the API call
        axios(configuration)
            .then((result) => {
                setSignup(true);
                // set the cookie
                cookies.set("TOKEN", result.data.token, {
                    path: "/",
                });
                window.location.href = "/users";
            })
            .catch((error) => {
                error = new Error();
            });

        // prevent the form from refreshing the whole page
        e.preventDefault();
        // // make a popup alert showing the "submitted" text
        // alert("Submited");
    }

    return (
        <>
            <h2>Login</h2>
            <Form onSubmit={(e) => handleSubmit(e)}>

                {/* display success message */}
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

                {/* password */}
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

                {/* submit button */}
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