import {
    React,
    useState,
    useEffect
} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

function PageAfficherDemandeAdmin() {
    const { t } = useTranslation();

    const [render, setRender] = useState(false);
    const [listeDemandes, setListeDemande] = useState([]);

    const [tri, setTri] = useState('name');
    const [ordre, setOrdre] = useState('Croissant');

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/demandesSpeciales`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setListeDemande(body);
        };
        chercherDonnees();
    }, []);

    function HandleChange(value)
    {
        if (value === "Nom")
        {
            setTri("name");
        }
        else if (value === "Date")
        {
            setTri("dateAjout");
        }
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

        demandesInactives.sort((a, b) => {
            if (a[tri].toLowerCase() < b[tri].toLowerCase()) {
                return ordre === 'Croissant' ? -1 : 1;
            }
            if (a[tri].toLowerCase() > b[tri].toLowerCase()) {
                return ordre === 'Croissant' ? 1 : -1;
            }
            return 0;
        });

        var demandesJSX = demandesInactives.map((demande, index) =>
            <>
                <li style={{ color: "grey" }}> {demande.name} - {demande.dateAjout} </li>
                {demande.listeChansons.map((chanson, index2) =>
                    <ul>
                        <li key ={index2} style={{ color: "grey" }}>{chanson.artiste} - {chanson.titre}</li>
                    </ul>
                )}
                <Row style={{ marginTop: "10px" }}>
                    <Button variant="success" key ={index} style={{ marginRight: "10px" }} onClick={() => handleClickButtonActif(demande)} >Réactiver</Button>
                </Row>
                <br /><br />
            </>
        )
        return demandesJSX;
    }

    function AfficherDemandesActives(demandes) {
        const demandesActives = demandes.filter((demande) => demande.estActive);

        demandesActives.sort((a, b) => {
            if (a[tri].toLowerCase() < b[tri].toLowerCase()) {
                return ordre === 'Croissant' ? -1 : 1;
            }
            if (a[tri].toLowerCase() > b[tri].toLowerCase()) {
                return ordre === 'Croissant' ? 1 : -1;
            }
            return 0;
        });

        var demandesJSX = demandesActives.map((demande, index) =>
            <>
                <li> {demande.name} - {demande.dateAjout} </li>
                {demande.listeChansons.map((chanson, index2) =>
                    <ul>
                        <li key ={index2}>{chanson.artiste} - {chanson.titre}</li>
                    </ul>
                )}
                <Row style={{ marginTop: "10px" }}>
                    <Button variant="danger" key ={index} style={{ marginRight: "10px" }} onClick={() => handleClickButtonActif(demande)}>Désactiver</Button>
                </Row>
                <br /><br />
            </>
        )
        return demandesJSX;
    }
    

    if (listeDemandes?.length) {
        return (
            <>
                <Form className="m-2 bg-light">
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Trier par :</Form.Label>
                            <Form.Control as="select" value={tri} onChange={(event) => HandleChange(event.target.value)}>
                                <option>Nom</option>
                                <option>Date</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Ordre :</Form.Label>
                            <Form.Control as="select" value={ordre} onChange={(event) => setOrdre(event.target.value)}>
                                <option>Croissant</option>
                                <option>Décroissant</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                </Form>
                <br />
                <ul><h3 className="bg-success text-white rounded" style={{ textAlign: "center" }}>Demande Actives</h3>
                    {AfficherDemandesActives(listeDemandes)}
                    <h3 className="bg-danger text-white rounded" style={{ textAlign: "center" }}>Demande Inactives</h3>
                    {AfficherDemandesInactives(listeDemandes)}
                </ul>
            </>
        );
    }
    else {
        return <h5 variant={"info"}>{t('aucuneDemandeTrouvee')}</h5>;
    } 
}

export default PageAfficherDemandeAdmin;