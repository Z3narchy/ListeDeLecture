import { UtiliseAuth } from "../context/Auth";
import {
    React,
    useState,
    useEffect
} from 'react';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom';

function PageGestionPourUtilisateur() {
    const { username } = UtiliseAuth();
    const [render, setRender] = useState(false);
    const [listeDemandes, setListeDemande] = useState([]);

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/demandesSpeciales/${username}`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setListeDemande(body);
        };
        chercherDonnees();
    }, []);

    if (listeDemandes?.length) {

        return (
            <>
                <br />
                <ul>
                    <h3 style={{ textAlign: "center" }}>Mes Demandes</h3>
                    <Row style={{ justifyContent: "center" }}>
                        <Link to="/creerDemandeSpeciale">
                            <Button style={{ margin: "10px" }}>Nouvelle Demande Spéciale</Button>
                        </Link>
                    </Row>
                    <h4 className="bg-success text-white rounded" style={{ textAlign: "center" }}>Demandes Actives</h4>
                    {AfficherDemandesActives(listeDemandes)}
                    <h4 className="bg-danger text-white rounded" style={{ textAlign: "center" }}>Demandes Inactives</h4>
                    {AfficherDemandesInactives(listeDemandes)}
                </ul>
            </>
        );
    }
    else {
        return (
            <>
                <br />
                <Link to="/creerDemandeSpeciale">
                    <Button style={{ marginRight: "10px" }}>Nouvelle Demande Spéciale</Button>
                </Link>
                <h5 variant={"info"} >Aucune demande spéciale.</h5>
            </>
        );
    }

    async function handleClickButtonActif(demande) {
        demande.estActive = !demande.estActive;
        const modifierActif = async () => {
            await fetch(`/api/demandesSpeciales/modifier/${demande._id}`, {
                method: 'put',
                body: JSON.stringify({ name: demande.name, listeChansons: demande.listeChansons, estActive: demande.estActive, dateAjout: demande.dateAjout }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };
        modifierActif();
        setRender(!render);
    }

    function AfficherDemandesInactives(demandes) {
        const demandesInactives = demandes.filter((demande) => !demande.estActive);
        var demandesJSX = demandesInactives.map((demande) =>
            <>
                <li style={{ color: "grey" }}> {demande.name + " - " + demande.dateAjout} </li>
                
                {demande.listeChansons.map((chanson) =>
                    <ul>
                        <li style={{ color: "grey" }}>{chanson.artiste} - {chanson.titre}</li>
                    </ul>
                )}
                <Row style={{ marginTop: "10px" }}>
                    <Button variant="success" style={{ marginRight: "10px" }} onClick={() => handleClickButtonActif(demande)}>Réactiver</Button>
                </Row>
                <br /><br />
            </>
        )
        return demandesJSX;
    }

    function AfficherDemandesActives(demandes) {
        const demandesActives = demandes.filter((demande) => demande.estActive);
        var demandesJSX = demandesActives.map((demande) =>
            <>
                <li> {demande.name + " - " + demande.dateAjout} </li>
                {demande.listeChansons.map((chanson) =>
                    <ul>
                        <li>{chanson.artiste} - {chanson.titre}</li>
                    </ul>
                )}
                <Row style={{ marginTop: "10px" }}>
                    <Button variant="danger" style={{ marginRight: "10px" }} onClick={() => handleClickButtonActif(demande)}>Désactiver</Button>
                    <Link to={`/modifierDemandeSpeciale/${demande._id}`}>
                        <Button variant="warning" style={{ marginRight: "10px" }}>Modifier</Button>
                    </Link>
                </Row>
                <br /><br />
            </>
        )
        return demandesJSX;
    }
}

export default PageGestionPourUtilisateur;