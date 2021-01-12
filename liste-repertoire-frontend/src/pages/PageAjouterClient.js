import React from 'react';
import FormulaireAjouterPiece from '../composants/FormulaireAjouterPiece';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

function PageAjouterClient() {
    return (
    <>
        <h1>Ajouter une nouvelle pièce</h1>
        <h3>Bonjour, vous pouvez ajouter une pièce avec le formulaire ci-dessous.</h3>
        <FormulaireAjouterPiece />
        <Link to="/repertoire">
            <Button variant={'danger'} >Annuler</Button>    
        </Link>
    </>
    );    
}

export default PageAjouterClient;