import {
    React,
    useState,
} from 'react';

import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

function FormulaireInscription() {
    const { t } = useTranslation();
    const [username, setUsername] = useState("");
    const [motPasse, setMotDePasse] = useState('');
    const [rediriger, setRediriger] = useState(false);
    const [alert, setAlert] = useState(null);

    const CreerUtilisateur = async () =>
    {
        const resultat = await fetch(`/api/utilisateurs/chercher/${username}`).catch();
        const nomUser = await resultat.json();

        if(username !== nomUser)
        {
            await fetch(`/api/utilisateurs/ajouter`, {
                method: 'post',
                body: JSON.stringify({ username, motPasse }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setRediriger(true);
        }
        else
        {
            setAlert(true);
        }   
    };

    function alerteDejaInscrit()
    {
        if(alert !== null){
            return(<Alert variant="warning">{t('nomUtilisateurExiste')}</Alert>)
        }
        else{
            return null;
        }
    }

    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/" />
        }
    }

    return (
        <>
            {AfficherRedirection()}
            <div className="d-flex justify-content-center">
                <Form className="mb-1 col-md-4">
                    <Form.Group>
                    {alerteDejaInscrit()}
                        <Form.Label>{t('nomUsager')}</Form.Label>
                        <Form.Control type="text" value={username}
                            onChange={(event) => setUsername(event.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{t('motPasse')}</Form.Label>
                        <Form.Control type="password" value={motPasse}
                            onChange={(event) => setMotDePasse(event.target.value)} />
                    </Form.Group>
                    <Button className="btn-block my-2" variant={'primary'} onClick={CreerUtilisateur} >
                    {t('inscription')}
                    </Button>
                    <Button className="btn-block my-2" variant={'danger'} onClick={() => setRediriger(true)}>
                    {t('annuler')}
                    </Button>
                    <p>{t('dejaInscritConnectezVous')}<Link to='/connexion'>{t('ici')}</Link></p>
                </Form>
            </div>
        </>
    )
}

export default FormulaireInscription;