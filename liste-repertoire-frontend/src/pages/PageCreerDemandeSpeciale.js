import {
    React,
    useState,
    useEffect
} from 'react';
import { UtiliseAuth } from '../context/Auth';
import ListePiecesDemande from '../composants/ListePiecesDemande';
import ListePiecesAjouter from '../composants/ListePiecesAjouter';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

function PageCreerDemandeSpeciale() {
    const [listePieces, setListePieces] = useState([]);
    const [rediriger, setRediriger] = useState(false);
    const [listeDemandes, setListeDemande] = useState([]);

    const { username } = UtiliseAuth()

    const estActive = true;
    const dateAjout = new Date().toLocaleDateString()

    const envoyerDemande = async () => {
        await fetch(`/api/demandesSpeciales/ajouter`, {
            method: 'post',
            body: JSON.stringify({ name: username, listeDemandes, estActive, dateAjout }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setRediriger(true);
    };

    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/gestionDemandesUtilisateur" />
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
        var piece = listePieces.find(c => c._id === id);
        var nouvelleListe = listeDemandes.slice();
        if (!nouvelleListe.includes(piece)) {
            nouvelleListe.push(piece);
            setListeDemande(nouvelleListe)
        }
    }
    return (
        <>
            {AfficherRedirection()}
            <h1>Demande spéciale</h1>

            <Form className="mb-1">
                <Form.Group>
                    <Form.Label>Nom d'usager</Form.Label>
                    <Form.Control disabled type="text" value={username} />
                </Form.Group>
                <h3>Pièce(s) déjà ajouté(s).</h3>
                <ListePiecesAjouter pieces={listeDemandes} setListeDemande={setListeDemande} />
                <Button disabled={listeDemandes.length == 0} variant="primary" onClick={envoyerDemande} >
                    Envoyer
                </Button>
            </Form>
            <ListePiecesDemande pieces={listePieces} listeDemandes={listeDemandes} handle={handleclick} />
        </>
    );
}

export default PageCreerDemandeSpeciale;