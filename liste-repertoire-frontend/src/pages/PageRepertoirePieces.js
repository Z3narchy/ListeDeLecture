import {
    React,
    useState,
    useEffect
} from 'react';

import ListePieces from '../composants/ListePieces';
import { useTranslation } from 'react-i18next';

function PageRepertoirePieces() {
    const [listePieces, setListePieces] = useState([]);
    const { t } = useTranslation();

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
            <h1>{t('listeRepertoire')}</h1>
            <ListePieces pieces={listePieces} />
        </>
    );
}

export default PageRepertoirePieces;