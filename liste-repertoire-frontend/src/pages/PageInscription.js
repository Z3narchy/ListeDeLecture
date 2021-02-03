import {
    React,
    useState,
} from 'react';

import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function PageInscriptionUtilisateur() {
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
            return(<Alert variant="warning">Le nom d'utilisateur existe déjà</Alert>)
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
                    <h5 className="text-center">Inscription</h5>
                    <Form.Group>
                    {alerteDejaInscrit()}
                        <Form.Label>Nom d'utilisateur</Form.Label>
                        <Form.Control type="text" value={username}
                            onChange={(event) => setUsername(event.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control type="password" value={motPasse}
                            onChange={(event) => setMotDePasse(event.target.value)} />
                    </Form.Group>
                    <Button className="btn-block my-2" variant={'primary'} onClick={CreerUtilisateur} >
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

export default PageInscriptionUtilisateur;