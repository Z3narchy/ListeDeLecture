import {
    React,
    useState
} from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

function PageSupprimer({ match }) {
    const id = match.params.id;
    const [rediriger, setRediriger] = useState(false);

    const confirmerSuppression = async () => {
        await fetch(`/api/pieces/supprimer/${id}`, {
            method: 'delete',
        });
        
        setRediriger(true);
    };

    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/admin" />
        }
    }

    return (
    <>
        {AfficherRedirection()}
        <h1>Supprimer</h1>
        <Alert variant={'danger'} >
            Êtes-vous certain de vouloir supprimer cette pièce?
        </Alert>

        <Button variant={'primary'} className={'mr-1'} onClick={confirmerSuppression} >Supprimer</Button>

        <Link to="/admin">
            <Button variant={'danger'} >Annuler</Button>  
        </Link>
        
    </>
    );
}

export default PageSupprimer;