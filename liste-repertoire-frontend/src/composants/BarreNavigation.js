import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { UtiliseAuth } from '../context/Auth';

function BarreNavigation() {
    const{username} = UtiliseAuth();
    const{estAdmin} = UtiliseAuth();
    return (
        <Navbar bg="light" expand="sm">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/" exact>
                        <Nav.Link>Accueil</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/repertoirePieces">
                        <Nav.Link>Repertoire</Nav.Link>
                    </LinkContainer>
                </Nav>
                <Nav>
                    {
                        username ?  
                        <>
                            <LinkContainer to="/gestionDemandesUtilisateur">
                                <Nav.Link>Mes Demandes</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/creerDemandeSpeciale">
                                <Nav.Link>Demande spéciale</Nav.Link>
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
                    {
                        estAdmin ?
                        <LinkContainer to="/admin">
                            <Nav.Link>Admin</Nav.Link>
                        </LinkContainer>
                        :null
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default BarreNavigation;