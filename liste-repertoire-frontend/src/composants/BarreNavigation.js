import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { UtiliseAuth } from '../context/Auth';

function BarreNavigation() {
    const { username } = UtiliseAuth();
    const { estAdmin } = UtiliseAuth();
    return (
        <>
            <Navbar bg="light" expand="sm">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/" exact>
                            <Nav.Link>Accueil</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/repertoirePieces">
                            <Nav.Link>Répertoire</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        {
                            estAdmin === "true" ?
                                <>
                                    <NavDropdown title="Administration">
                                        <NavDropdown.Item>
                                            <LinkContainer to="/admin">
                                                <Nav.Link>Admin</Nav.Link>
                                            </LinkContainer>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <LinkContainer to="/gestionUtilisateurs">
                                                <Nav.Link>Gestion Usagers</Nav.Link>
                                            </LinkContainer>
                                        </NavDropdown.Item>

                                    </NavDropdown>
                                </>
                                : null
                        }
                        {
                            username ?
                                <>
                                    <LinkContainer to="/gestionDemandesUtilisateur">
                                        <Nav.Link>Mes Demandes</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/deconnexion">
                                        <Nav.Link>Deconnexion</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/">
                                        <Nav.Link>Compte <strong>{username}</strong></Nav.Link>
                                    </LinkContainer>
                                </>
                                :
                                <>
                                    <LinkContainer to="/inscription">
                                        <Nav.Link>Inscription</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/connexion">
                                        <Nav.Link>Connexion</Nav.Link>
                                    </LinkContainer>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default BarreNavigation;