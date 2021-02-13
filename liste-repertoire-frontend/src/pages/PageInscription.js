import React from 'react';
import FormulaireInscription from '../composants/FormulaireInscription';
import { useTranslation } from 'react-i18next';

function PageInscription() {
    const { t } = useTranslation();
    return (
        <>
            <h5 className="text-center">{t('inscription')}</h5>
            <FormulaireInscription />
        </>
    )
}

export default PageInscription;