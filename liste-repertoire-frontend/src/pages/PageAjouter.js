import React from 'react';
import FormulaireAjouterPiece from '../composants/FormulaireAjouterPiece';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

function PageAjouter() {
    return (
    <>
        <h1>Ajouter une nouvelle pièce</h1>
        <FormulaireAjouterPiece />
        <Link to="/admin">
            <Button variant={'danger'} >Annuler</Button>    
        </Link>
    </>
    );    
}

export default PageAjouter;