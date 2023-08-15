import {Container, Col, Row} from "react-bootstrap";
import "./App.css";
import {Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import User from "./components/user/User";
import LoginComponent from "./components/Login";
import RegistrationComponent from "./components/Reqistration";
import {ProtectedRoutes} from "./components/ProtectedRoutes";
import LogOut from "./components/LogOut";
import "bootstrap/dist/css/bootstrap.min.css"
import Cookies from "universal-cookie";

function App() {

    function refreshPage() {
        window.location.reload(false);
    }

    const auth = () => {
        const cookies = new Cookies();
        if (cookies.get("TOKEN") == null) {
            return (
                <>
                    <a href="/login">Login</a>
                    <a href="/registration">Registration</a>
                </>
            )
        } else {
            return (
                <>
                    <a href="/users">Users</a>
                    <a onClick={refreshPage} href="/logout" >Logout</a>
                </>
            )
        }
    }

    return (
        <Container>
            <Row>
                <Col className="text-center">
                    <h1>Task 4</h1>

                    <section id="navigation">
                        <a href="/">Home</a>

                        {auth()}
                    </section>
                </Col>
            </Row>

            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/login" element={<LoginComponent/>}/>
                <Route exact path="/logout" element={<LogOut/>}/>
                <Route exact path="/registration" element={<RegistrationComponent/>}/>

                <Route exact path='/users/*' element={
                    <ProtectedRoutes>
                        <User/>
                    </ProtectedRoutes>
                }/>
            </Routes>
        </Container>
    );
}

export default App;