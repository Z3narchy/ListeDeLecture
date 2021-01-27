import {
    React,
    useState,
    useEffect
} from 'react';
import Button from 'react-bootstrap/Button'

function PageAfficherDemandeAdmin() {
    const [render, setRender] = useState(false);
    const [listeDemandes, setListeDemande] = useState([]);

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/demandesSpeciales`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setListeDemande(body);
        };
        chercherDonnees();
    }, []);

    if (listeDemandes?.length) {

        return (
            <>
                <br />
                <ul><h3 style={{ textAlign: "center" }}>Demande Actives</h3>
                    {AfficherDemandesActives(listeDemandes)}
                    <h3 style={{ textAlign: "center" }}>Demande Inactives</h3>
                    {AfficherDemandesInactives(listeDemandes)}
                </ul>
            </>
        );
    }
    else {
        return <h5 variant={"info"} >Aucune demande trouvée.</h5>;
    }

    async function handleClickButtonActif(demande) {
        demande.estActive = !demande.estActive;
        const modifierActif = async () => {
            await fetch(`/api/demandesSpeciales/modifier/${demande._id}`, {
                method: 'put',
                body: JSON.stringify({ name: demande.name, listeChansons: demande.listeChansons, estActive: demande.estActive, dateAjout: demande.dateAjout}),
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
                {console.log(demande)}
                <Button style={{ marginRight: "10px" }} onClick={() => handleClickButtonActif(demande)} >Réactiver</Button>
                <li style={{ color: "grey" }}> {demande.name} - {demande.dateAjout} </li>
                {demande.listeChansons.map((chanson) =>
                    <ul>
                        <li style={{ color: "grey" }}>{chanson.artiste} - {chanson.titre}</li>
                    </ul>
                )}
                <br /><br />
            </>
        )
        return demandesJSX;
    }

    function AfficherDemandesActives(demandes) {
        const demandesActives = demandes.filter((demande) => demande.estActive);
        var demandesJSX = demandesActives.map((demande) =>
            <>
                <Button style={{ marginRight: "10px" }} onClick={() => handleClickButtonActif(demande)}>Désactiver</Button>
                <li> {demande.name} - {demande.dateAjout} </li>
                {demande.listeChansons.map((chanson) =>
                    <ul>
                        <li>{chanson.artiste} - {chanson.titre}</li>
                    </ul>
                )}
                <br /><br />
            </>
        )
        return demandesJSX;
    }
}

export default PageAfficherDemandeAdmin;