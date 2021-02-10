import {
    React,
    useState
} from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Redirect } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import { useTranslation } from 'react-i18next';

function FormulaireAjouterPiece({ id }) {
    const { t } = useTranslation();
    const [titre, setTitre] = useState('');
    const [artiste, setArtiste] = useState('');
    const [categories, setCategories] = useState(['']);
    const [rediriger, setRediriger] = useState(false);

    const envoyerFormulaire = async () => {
        await fetch(`/api/pieces/ajouter`, {
            method: 'post',
            body: JSON.stringify({ titre, artiste, categories }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setRediriger(true);
    };

    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/admin" />
        }
    }

    function AjouterCategorie() {
        var nouvelleCategorie = categories.slice();
        nouvelleCategorie.push('');
        setCategories(nouvelleCategorie);
    }

    function ChangementCategorie(index, valeur) {
        var categorieChangee = categories.slice();
        categorieChangee.splice(index, 1, valeur)
        setCategories(categorieChangee);
    }

    function SupprimerCategorie(index) {
        var categorieSupprimee = categories.slice();
        categorieSupprimee.splice(index, 1);
        setCategories(categorieSupprimee);
    }

    function CategoriesDistinctes()
    {
        var categoriesDistinctes = categories.filter((categorie, index, a) => a.indexOf(categorie) === index);
        return categories.length === categoriesDistinctes.length;
    }

    return (
        <>
            {AfficherRedirection()}
            <Form className="mb-1">
                <Form.Group>
                    <Form.Label>{t('titre')}</Form.Label>
                    <Form.Control type="text" value={titre}
                        onChange={(event) => setTitre(event.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>{t('artiste')} / {t('groupe')}</Form.Label>
                    <Form.Control type="text" value={artiste}
                        onChange={(event) => setArtiste(event.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>{t('categorie')}</Form.Label>
                    {categories.map((categorie, index) =>
                        <InputGroup key={index}>
                            <Form.Control className="my-2" type="text" value={categorie}
                                onChange={(event) => ChangementCategorie(index, event.target.value)} />
                            <InputGroup.Append>
                                <Button className="my-2" variant="danger" onClick={() => SupprimerCategorie(index)} >
                                    X
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    )}
                    <div className="text-center">
                        <Button disabled={categories.includes('')} className="ml-2" variant="success" onClick={AjouterCategorie} >
                            +
                        </Button>
                    </div>
                </Form.Group>
                { !CategoriesDistinctes() ? <Alert variant="warning">{t('peuxPas2Categories')}</Alert> : null}
                { categories.length === 0 ? <Alert variant="warning">{t('inclureAuMoins1Categorie')}</Alert> : null}
                <Button disabled={titre === '' || artiste === '' || categories.includes('') || categories.length === 0 || !CategoriesDistinctes()} variant="primary" onClick={envoyerFormulaire} >
                {t('ajouter')}
            </Button>
            </Form>
        </>
    );
}

export default FormulaireAjouterPiece;