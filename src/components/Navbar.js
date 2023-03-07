import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { Button, Navbar as NavHead } from 'react-bootstrap'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()

    /**
     * It removes the Auth token from local storage and navigates the user back to the homepage
     */
    const handlelogout = () => {
        localStorage.removeItem("Auth")
        navigate("/")
    }
    return (
        <div>
            <NavHead bg="light" expand="lg">
                <Container>

                    <NavHead.Collapse id="basic-navbar-nav">
                        <Nav >
                            <NavDropdown title=" Profile" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/users/editprofile">
                                    EditProfile
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/users/resetpwd">
                                    Reset password
                                </NavDropdown.Item>
                                <NavDropdown.Item >
                                    <Button onClick={() => handlelogout()}>Logout</Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </NavHead.Collapse>
                </Container>
            </NavHead>
        </div>
    )
}

export default Navbar