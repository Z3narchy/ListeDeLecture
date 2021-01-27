import {
    React,
    useState,
    useEffect
} from 'react';

import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function PageInscription() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alerteUsername, setAlerteUsername] = useState(true);
    const [rediriger, setRediriger] = useState(false);

    useEffect(() => {
        const chercherDonnees = async () => {
            if (username != '') {
                const resultat = await fetch(`/api/utilisateurs/${username}`);
                const body = await resultat.json().catch((error) => { console.log(error) });
                if (body == undefined) {
                    setAlerteUsername(false);
                }
                else if (body.username != undefined) {
                    setAlerteUsername(true);
                }
            }
            else
            {
                setAlerteUsername(true);
            }

        };
        chercherDonnees();
    }, [username]);

    const envoyerFormulaire = async () => {
        await fetch(`/api/utilisateurs/ajouter`, {
            method: 'post',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setRediriger(true);
    };

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
                    <h5 className="text-center">Inscription</h5>
                    <Form.Group>
                        <Form.Label>Nom d'utilisateur</Form.Label>
                        <Form.Control type="text" value={username}
                            onChange={(event) => setUsername(event.target.value)} />
                    </Form.Group>
                    {
                        (username == '') ?
                            null :
                            (alerteUsername) ?
                                <Alert variant={'danger'}>Ce nom d'utilisateur est déjà utilisé</Alert> :
                                <Alert variant={'success'}>Ce nom d'utilisateur est disponible</Alert>
                    }
                    <Form.Group>
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="text" value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                </Form.Group>
                <Button disabled={alerteUsername} className="btn-block my-2" variant={'primary'} onClick={envoyerFormulaire} >
                    Inscription
                </Button>
                <Button className="btn-block my-2" variant={'danger'} onClick={() => setRediriger(true)}>
                    Annuler
                </Button>
                    <p>Déjà inscrit ? Connectez vous <Link to='/connexion'>ici</Link></p>
                </Form>
        </div>
        </>
    )
}

export default PageInscription;