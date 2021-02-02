import {
    React,
    useState,
    useEffect
} from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import { UtiliseAuth } from '../context/Auth';
import ListePiecesAjouter from './ListePiecesAjouter';
import ListePiecesDemande from './ListePiecesDemande';

function FormulaireModifierDemandeSpeciale({ id }) 
{
    const {username} = UtiliseAuth();
    const [listePieces, setListePieces] = useState([]);
    const [listeDemandes, setListeDemande] = useState([]);
    const [rediriger, setRediriger] = useState(false);    

    const estActive = true;
    const dateAjout = new Date().toLocaleDateString()
    
    useEffect(() => {
        const chercherDemande = async () => {
            const resultat = await fetch(`/api/demandesSpeciales/demande/${id}`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setListeDemande(body.listeChansons);
        };
        chercherDemande();
    }, [id]);

    useEffect(() => {
        const chercherPieces = async () => {
            const resultat = await fetch(`/api/pieces`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setListePieces(body);
        };
        chercherPieces();
    }, [id]);

    
    const envoyerDemande = async () => {
        await fetch(`/api/demandesSpeciales/modifier/${id}`, {
            method: 'put',
            body: JSON.stringify({ name : username, listeChansons: listeDemandes, estActive, dateAjout}),
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

    function handleclick(id) {
        var piece = listePieces.find(c => c._id == id);
        var nouvelleListe = listeDemandes.slice();
        if (!nouvelleListe.includes(piece)) {
            nouvelleListe.push(piece);
            setListeDemande(nouvelleListe)
        }
    }
    
    const autresPieces = listePieces.filter(piece => undefined === listeDemandes.find
        ((demande) => demande.titre === piece.titre));

    console.log("listePieces:");
    console.log(listePieces);
    console.log("listeDemandes:");
    console.log(listeDemandes);
    return (
        <>
            {AfficherRedirection()}
            <h1>Liste du répertoire</h1>

            <Form className="mb-1">
                <Form.Group>
                    <Form.Label>Nom d'usager</Form.Label>
                    <Form.Control disabled type="text" value={username}/>
                </Form.Group>
                <p>Cliquer sur le bouton pour envoyer votre demande modifiée.</p>
                <Button variant="primary" onClick={envoyerDemande} >
                    Envoyer
            </Button>
                <h3>Pièce(s) déjà ajouté(s).</h3>
                <ListePiecesAjouter pieces={listeDemandes}  setListeDemande={setListeDemande}/>
            </Form>
            <p>Pour ajouter une chanson à votre liste, simplement cliquer sur le bouton 'Ajouter'.</p>
            <ListePiecesDemande pieces={autresPieces} listeDemandes={listeDemandes} handle={handleclick} />
        </>
    );
}

export default FormulaireModifierDemandeSpeciale;