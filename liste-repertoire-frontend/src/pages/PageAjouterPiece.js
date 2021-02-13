import React from 'react';
import FormulaireAjouterPiece from '../composants/FormulaireAjouterPiece';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


function PageAjouterPiece() {
    const { t } = useTranslation();

    return (
        <>
            <h1>{t('ajouterPiece')}</h1>
            <FormulaireAjouterPiece />
            <Link to="/admin">
                <Button variant={'danger'}>{t('annuler')}</Button>
            </Link>
        </>
    );
}

export default PageAjouterPiece;