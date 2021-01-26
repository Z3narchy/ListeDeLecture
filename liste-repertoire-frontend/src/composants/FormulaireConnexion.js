import {
    React,
    useState, 
    useEffect
} from 'react';
import { UtiliseAuth } from '../context/Auth';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

function FormulaireConnexion() {
    const [usager, setUsager] = useState('');
    const [motPasse, setMotPasse] = useState('');
    const [usagerBD, setUsagerBD] = useState('');
    const [motPasseBD, setMotPasseBD] = useState('');
    const [statusBD, setStatusBD] = useState('');
    const [rediriger, setRediriger] = useState(false);
    const { setAuthentification, setEstAdmin, setUsername } = UtiliseAuth();

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/pieces/${usager}`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setUsagerBD(body.usager);
            setMotPasseBD(body.motPasse);
            setStatusBD(body.estAdmin);
        };
        chercherDonnees();
    }, []);
    
    function confirmationFormulaire()  {
        
        if(usager === usagerBD && motPasse === motPasseBD)
        {
            setAuthentification(true);
            setUsername(usager);
        }
        else if(usager === usagerBD && motPasse === motPasseBD && statusBD === 'true')
        {
            setAuthentification(true);
            setUsername(usager);
            setEstAdmin(true);
        }
        setUsager("");
        setMotPasse("");
        setRediriger(true);
    };

    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/connexion" />
        }
    }

    return (
        <>
            {AfficherRedirection()}
            <Form className="mb-1">
                <Form.Group>
                    <Form.Label>Nom d'usager</Form.Label>
                    <Form.Control type="text" value={usager}
                        onChange={(event) => setUsager(event.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="text" value={motPasse}
                        onChange={(event) => setMotPasse(event.target.value)} />
                </Form.Group>
                <Button className="btn-block" variant="primary"  onClick={confirmationFormulaire} >
                    Connexion
            </Button>
            </Form>
        </>
    );
}

export default FormulaireConnexion;