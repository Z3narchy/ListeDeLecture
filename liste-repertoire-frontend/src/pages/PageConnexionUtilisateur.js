import React from 'react';
import FormulaireConnexion from '../composants/FormulaireConnexionUtilisateur';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

function PageConnexionUtilisateur() {
    return (
        <>
            <div className="d-flex justify-content-center">
                <Form className="mb-1 col-md-4">
                    <h5>Connecter vous à votre compte!</h5>
                    <FormulaireConnexion />
                    <Link to="/">
                        <Button className="btn-block" variant={'danger'} >Annuler</Button>
                    </Link>
                </Form>
            </div>
        </>
    );
}

export default PageConnexionUtilisateur;