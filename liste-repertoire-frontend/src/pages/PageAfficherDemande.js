import {
    React,
    useState,
    useEffect
} from 'react';

function AfficherDemandes(demandes) {
    var demandesJSX = demandes.map((demande) =>
        <>
            <li>{demande.name}</li>
            {demande.listeChansons.map((chanson) =>
                <ul>
                    <li>{chanson.titre}</li>
                    <li>{chanson.artiste}</li>
                </ul>)}
        </>
    )
    return demandesJSX;
}
function PageAfficherDemande() {
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
                <ul>
                    {AfficherDemandes(listeDemandes)}
                </ul>
            </>
        );
    }
    else {
        return <h5 variant={"info"} >Aucune liste de demande.</h5>;
    }
}

export default PageAfficherDemande;