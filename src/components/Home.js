import React from "react";
import homeImage from "../img/home_image.jpg";
import {Col, Image, Row} from "react-bootstrap";
export default function Home() {
    return (
        <div>
            <h1 className="text-center">Home Component</h1>
            <Row className="justify-content-md-center">
                <Col xs={12} sm={4} md={4}>
                    <Image className="center" src={homeImage}/>
                </Col>
            </Row>`
        </div>
    );
}