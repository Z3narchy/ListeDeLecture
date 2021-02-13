import { UtiliseAuth } from "../context/Auth";
import FormulaireModifierDemandeSpeciale from "../composants/FormulaireModifierDemandeSpeciale";
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function PageModifierDemandeSpeciale({ match }) {
    const id = match.params.id;
    const { t } = useTranslation();
    return (
        <>
            <h1>{t('modifier')}</h1>
            <FormulaireModifierDemandeSpeciale id={id} />
            <Link to="/gestionDemandesUtilisateur">
                <Button variant={'danger'} >{t('annuler')}</Button>
            </Link>
        </>
    );
}

export default PageModifierDemandeSpeciale;