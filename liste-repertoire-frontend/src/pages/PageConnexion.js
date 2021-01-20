import React from 'react';
import FormulaireConnexion from '../composants/FormulaireConnexion';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

function PageConnexion() {
    return (
        <>
            <h1>Connecter vous à votre compte!</h1>
            <FormulaireConnexion />
            <Link to="/">
                <Button variant={'danger'} >Annuler</Button>
            </Link>
        </>
    );
}

export default PageConnexion;