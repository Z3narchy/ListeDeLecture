import {
    React,
    useState
} from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function PageSupprimerPiece({ match }) {
    const id = match.params.id;
    const [rediriger, setRediriger] = useState(false);
    const { t } = useTranslation();
    const confirmerSuppression = async () => {
        await fetch(`/api/pieces/supprimer/${id}`, {
            method: 'delete',
        });

        setRediriger(true);
    };

    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/admin" />
        }
    }

    return (
        <>
            {AfficherRedirection()}
            <h1>{t('supprimer')}</h1>
            <Alert variant={'danger'} >
            {t('esTuCertainSuppPiece')} 
        </Alert>

            <Button variant={'primary'} className={'mr-1'} onClick={confirmerSuppression} >{t('supprimer')}</Button>

            <Link to="/admin">
                <Button variant={'danger'} >{t('annuler')}</Button>
            </Link>

        </>
    );
}

export default PageSupprimerPiece;