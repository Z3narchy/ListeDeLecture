import React from 'react';
import FormulaireConnexion from '../composants/FormulaireConnexionUtilisateur';
import { useTranslation } from 'react-i18next';

function PageConnexionUtilisateur() {
    const { t } = useTranslation();

    return (
        <>
            <h5 className="text-center">{t('connectezVous')}</h5>
            <FormulaireConnexion />
        </>
    );
}

export default PageConnexionUtilisateur;