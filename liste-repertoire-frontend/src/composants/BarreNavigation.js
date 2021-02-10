import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { UtiliseAuth } from '../context/Auth';
import { useTranslation } from 'react-i18next';

function BarreNavigation() {
    const { username } = UtiliseAuth();
    const { estAdmin } = UtiliseAuth();
    const { t } = useTranslation();
    return (
        <>
            <Navbar bg="light" expand="sm">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/" exact>
                            <Nav.Link>{t('accueil')}</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/repertoirePieces">
                            <Nav.Link>{t('repertoire')}</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        {
                            estAdmin === "true" ?
                                <>
                                    <NavDropdown title="Administration">
                                        <NavDropdown.Item>
                                            <LinkContainer to="/admin">
                                                <Nav.Link>{t('general')}</Nav.Link>
                                            </LinkContainer>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <LinkContainer to="/gestionUtilisateurs">
                                                <Nav.Link>{t('gestionUsagers')}</Nav.Link>
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
                                        <Nav.Link>{t('mesDemandes')}</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/deconnexion">
                                        <Nav.Link>{t('deconnexion')}</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/">
                                        <Nav.Link>{t('compte')} <strong>{username}</strong></Nav.Link>
                                    </LinkContainer>
                                </>
                                :
                                <>
                                    <LinkContainer to="/inscription">
                                        <Nav.Link>{t('inscription')}</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/connexion">
                                        <Nav.Link>{t('connexion')}</Nav.Link>
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