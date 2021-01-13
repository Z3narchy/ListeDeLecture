import {
    React,
    useState,
    useEffect
} from 'react';
import ListePiecesDemande from '../composants/ListePiecesDemande';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

function PageDemande() {
    const [listePieces, setListePieces] = useState([]);
    const [nom, setNom] = useState('');
    const [rediriger, setRediriger] = useState(false);
    const [listeDemande, setListeDemande] = useState([]);

    const envoyerDemande = async () => {
        await fetch(`/api/pieces/ajouter`, {
            method: 'put',
            body: JSON.stringify({ nom, listeDemande }),
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
    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/pieces`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setListePieces(body);
        };
        chercherDonnees();
    }, []);

    return (
        <>
            {AfficherRedirection()}
            <h1>Liste du répertoire</h1>

            <Form className="mb-1">
                <Form.Group>
                    <Form.Label>Nom d'usager</Form.Label>
                    <Form.Control type="text" value={nom}
                        onChange={(event) => setNom(event.target.value)} />
                </Form.Group>
                <p>Cliquer sur le bouton pour envoyer votre liste.</p>
                <Button variant="primary" onClick={envoyerDemande} >
                    Envoyer
            </Button>
            </Form>
            <p>Pour ajouter une chanson à votre liste, simplement cliquer sur le bouton 'Add'.</p>
            <ListePiecesDemande pieces={listePieces} />
        </>
    );
}

export default PageDemande;