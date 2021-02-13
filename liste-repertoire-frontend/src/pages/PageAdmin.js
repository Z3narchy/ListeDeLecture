import {
    React,
    useState,
    useEffect
} from 'react';
import ListePiecesAdmin from '../composants/ListePiecesAdmin';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function PageAdmin() {
    const { t } = useTranslation();
    const [listePieces, setListePieces] = useState([]);

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/pieces`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setListePieces(body);
        };
        chercherDonnees();
    }, []);

    return (
        <>
            <h1>{t('pageAdmin')}</h1>
            <Link to="/ajouterPiece">
                <Button className="m-2">{t('ajouterPiece')}</Button>
            </Link>
            <Link to="/afficherDemandesAdmin">
                <Button className="m-2">{t('afficherListeDemandes')}</Button>
            </Link>
            <h2>{t('listeRepertoire')}</h2>
            <ListePiecesAdmin pieces={listePieces} />
        </>
    );
}

export default PageAdmin;