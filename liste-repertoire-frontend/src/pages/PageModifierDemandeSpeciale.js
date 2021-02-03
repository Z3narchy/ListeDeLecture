import { UtiliseAuth } from "../context/Auth";
import FormulaireModifierDemandeSpeciale from "../composants/FormulaireModifierDemandeSpeciale";
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

function PageModifierDemandeSpeciale({ match }) {
    const id = match.params.id;
    return (
        <>
            <h1>Modifier</h1>
            <FormulaireModifierDemandeSpeciale id={id} />
            <Link to="/gestionDemandesUtilisateur">
                <Button variant={'danger'} >Annuler</Button>
            </Link>
        </>
    );
}

export default PageModifierDemandeSpeciale;