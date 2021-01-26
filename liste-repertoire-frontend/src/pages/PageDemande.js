import {
    React,
    useState,
    useEffect
} from 'react';
import { UtiliseAuth } from "../context/Auth";
import ListePiecesDemande from '../composants/ListePiecesDemande';
import ListePiecesAjouter from '../composants/ListePiecesAjouter';
import { Alert, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

function PageDemande() {

    const {username} = UtiliseAuth();
    const [listePieces, setListePieces] = useState([]);
    const [rediriger, setRediriger] = useState(false);
    const [listeDemandes, setListeDemande] = useState([]);

    const envoyerDemande = async () => {
        await fetch(`/api/demandesSpeciales/ajouter`, {
            method: 'post',
            body: JSON.stringify({ username, listeDemandes }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setRediriger(true);
    };

    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/repertoire" />
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

    function handleclick(id) {
        var piece = listePieces.find(c => c._id == id);
        var nouvelleListe = listeDemandes.slice();
        if (!nouvelleListe.includes(piece)) {
            nouvelleListe.push(piece);
            setListeDemande(nouvelleListe)
        }
    }
    return (
        <>
            {AfficherRedirection()}
            <h1>Liste du répertoire</h1>

            <Form className="mb-1">
                <Form.Group>
                    <Form.Label>Nom d'usager</Form.Label>
                    <Form.Control disabled type="text" value={username}/>
                </Form.Group>
                <p>Cliquer sur le bouton pour envoyer votre liste.</p>
                <Button variant="primary" onClick={envoyerDemande} >
                    Envoyer
            </Button>
                <h3>Pièce(s) déjà ajouté(s).</h3>
                <ListePiecesAjouter pieces={listeDemandes} />
            </Form>
            <p>Pour ajouter une chanson à votre liste, simplement cliquer sur le bouton 'Add'.</p>
            <ListePiecesDemande pieces={listePieces} handle={handleclick} />
        </>
    );
}

export default PageDemande;