import {
    React,
    useState,
} from 'react';
import { UtiliseAuth } from '../context/Auth';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function FormulaireConnexion() {
    const { t } = useTranslation();
    const [usager, setUsager] = useState('');
    const [motPasse, setMotPasse] = useState('');
    const [rediriger, setRediriger] = useState(false);
    const { setAuthentification, setEstAdmin, setUsername } = UtiliseAuth();
    const [utilisateurExiste, setUtilisateurExiste] = useState(null);

    function VerifierUtilisateur() {
        const envoyerFormulaire = async () => {
            const resultat = await fetch(`/api/utilisateurs/connexion/${usager}`, {
                method: 'post',
                body: JSON.stringify({ motPasse }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const infosUtilisateur = await resultat.json();
            setAuthentification(infosUtilisateur.estValide);
            setUsername(infosUtilisateur.username);
            setEstAdmin(infosUtilisateur.estAdmin);
            setUtilisateurExiste(infosUtilisateur.estValide);
            setRediriger(true);
        };
        envoyerFormulaire();
    }

    function AfficherOffreInscription() {
        if (utilisateurExiste === false) {
            return (
                <>
                    <Alert variant="danger">{t('compteExistePas')}</Alert>
                    <Link to="/inscription">
                        <Button className="btn-block" variant="primary">{t('sinscrire')}</Button>
                    </Link>
                </>
            )
        }
    }
    
    function AfficherRedirection() {

        if (rediriger === true) {
            const { estAdmin, authentification } = UtiliseAuth();
            if (authentification === true) {
                if (estAdmin === true) {
                    return <Redirect to="/admin" />
                }
                else {
                    return <Redirect to="/" />
                }
            }
        }
    }

    return (
        <>
            {AfficherRedirection()}
            <div className="d-flex justify-content-center">
                <Form className="mb-1 col-md-4">
                    <Form.Group>
                        <Form.Label>{t('nomUsager')}</Form.Label>
                        <Form.Control type="text" value={usager}
                            onChange={(event) => setUsager(event.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{t('motPasse')}</Form.Label>
                        <Form.Control type="password" value={motPasse}
                            onChange={(event) => setMotPasse(event.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Button className="btn-block" variant="primary" onClick={VerifierUtilisateur} >
                        {t('connexion')}
                        </Button>
                        <Button className="btn-block my-2" variant={'danger'} onClick={() => setRediriger(true)}>
                        {t('annuler')}
                        </Button>
                        {AfficherOffreInscription()}
                    </Form.Group>
                </Form>
            </div>
        </>
    );
}

export default FormulaireConnexion;