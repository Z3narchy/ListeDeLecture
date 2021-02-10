import React from 'react';
import FormulaireCreerDemandeSpeciale from '../composants/FormulaireCreerDemandeSpeciale';
import { useTranslation } from 'react-i18next';

function PageCreerDemandeSpeciale() {
    const { t } = useTranslation();

    return (
        <>
            <h1>{t('demandeSpeciale')}</h1>
            <FormulaireCreerDemandeSpeciale />
        </>
    );
}

export default PageCreerDemandeSpeciale;