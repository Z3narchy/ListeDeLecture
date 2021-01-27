import React from 'react';
import FormulaireConnexion from '../composants/FormulaireConnexionUtilisateur';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

function PageConnexionUtilisateur() {
    return (
        <>
            <div className="d-flex justify-content-center">
                <FormulaireConnexion />
            </div>
        </>
    );
}

export default PageConnexionUtilisateur;