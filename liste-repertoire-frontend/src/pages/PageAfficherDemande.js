import {
    React,
    useState,
    useEffect
} from 'react';

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
                    {
                        listeDemandes.map(piece => <li>{piece.titre} - {piece.artiste}</li>)
                    }
                </ul>
            </>
        );
    }
    else {
        return <h5 variant={"info"} >Aucune liste de demande.</h5>;
    }
}

export default PageAfficherDemande;