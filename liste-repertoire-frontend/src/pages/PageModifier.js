import React from 'react';
import FormulaireModifierPiece from '../composants/FormulaireModifierPiece';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

function PageModifier({ match }) {
    const id = match.params.id;
    return (
        <>
            <h1>Modifier</h1>
            <FormulaireModifierPiece id={id} />
            <Link to="/admin">
                <Button variant={'danger'} >Annuler</Button>    
            </Link>
        </>
    ); 
}

export default PageModifier;