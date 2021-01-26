import {
    React,
    useState
} from 'react';

import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

function PageInscription() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rediriger, setRediriger] = useState(false);

    const envoyerFormulaire = async () => {
        await fetch(`/api/inscription`, {
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
            return <Redirect to="/admin" />
        }
    }

    return (
        <>
            {AfficherRedirection()}
            <div className="d-flex justify-content-center">
                <Form className="mb-1 col-md-4">
                    <Form.Group>
                        <Form.Label>Nom d'utilisateur</Form.Label>
                        <Form.Control type="text" value={username}
                            onChange={(event) => setUsername(event.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control type="text" value={password}
                            onChange={(event) => setPassword(event.target.value)} />
                    </Form.Group>
                    <Button className="btn-block" variant="primary" onClick={envoyerFormulaire} >
                        Inscription
                    </Button>
                    <p>Déjà inscrit ? Connectez vous <Link to='/connexion'>ici</Link></p>
                </Form>
            </div>
        </>
    )
}

export default PageInscription;