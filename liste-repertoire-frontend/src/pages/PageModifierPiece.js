import React from 'react';
import FormulaireModifierPiece from '../composants/FormulaireModifierPiece';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function PageModifierPiece({ match }) {
    const id = match.params.id;
    const { t } = useTranslation();
    return (
        <>
            <h1>{t('modifier')}</h1>
            <FormulaireModifierPiece id={id} />
            <Link to="/admin">
                <Button variant={'danger'} >{t('annuler')}</Button>
            </Link>
        </>
    );
}

export default PageModifierPiece;