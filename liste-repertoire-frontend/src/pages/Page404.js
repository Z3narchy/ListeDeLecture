import React from 'react';
import { useTranslation } from 'react-i18next';

function Page404() {
    const { t } = useTranslation();

    return (
        <>
            <h1>{t('erreur404')}</h1>
            <h5>{t('pageExistePas')}</h5>
        </>
    )
}

export default Page404;