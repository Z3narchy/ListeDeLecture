import { React, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

function ListePieces({ pieces }) {
    const { t } = useTranslation();
    const [tri, setTri] = useState('Titre');
    const [ordre, setOrdre] = useState('Croissant');
    const [rechercheTitre, setRechercheTitre] = useState('');
    const [rechercheArtiste, setRechercheArtiste] = useState('');
    const [rechercheCategorie, setRechercheCategorie] = useState('');

    if (pieces?.length) {
        // Tri des catégories pour chaque pièce individuellement
        pieces.forEach(piece =>
            piece.categorie.sort()
        );

        // Affiche seulement les pièces qui correspondent aux valeurs contenues dans les Input de recherche
        pieces = pieces.filter(function (piece) {
            var contientCategorie = false;
            piece.categorie.forEach(categorie => {
                if (categorie.toLowerCase().includes(rechercheCategorie.toLowerCase())) {
                    contientCategorie = true;
                }
            });

            return piece.titre.toLowerCase().includes(rechercheTitre.toLowerCase()) && piece.artiste.toLowerCase().includes(rechercheArtiste.toLowerCase()) && contientCategorie;
        });

        // Tri les pièces selon la valeur dans tri et ordre
        const trierPar = tri.toLowerCase().replace('é', 'e');

        pieces.sort((a, b) => {
            if (a[trierPar][0] < b[trierPar][0]) {
                return ordre === 'Croissant' ? -1 : 1;
            }
            if (a[trierPar][0] > b[trierPar][0]) {
                return ordre === 'Croissant' ? 1 : -1;
            }
            return 0;
        });

        return (
            <>
                <Form className="p-2 bg-light">
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>{t('titre')} :</Form.Label>
                            <Form.Control type="search" value={rechercheTitre} onChange={(event) => setRechercheTitre(event.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>{t('artiste')} :</Form.Label>
                            <Form.Control type="search" value={rechercheArtiste} onChange={(event) => setRechercheArtiste(event.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>{t('categorie')} :</Form.Label>
                            <Form.Control type="search" value={rechercheCategorie} onChange={(event) => setRechercheCategorie(event.target.value)} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>{t('trierPar')} :</Form.Label>
                            <Form.Control as="select" value={tri} onChange={(event) => setTri(event.target.value)}>
                                <option>Titre</option>
                                <option>Artiste</option>
                                <option>Catégorie</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>{t('ordre')} :</Form.Label>
                            <Form.Control as="select" value={ordre} onChange={(event) => setOrdre(event.target.value)}>
                                <option>Croissant</option>
                                <option>Décroissant</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                </Form>
                <Table bordered hover className="my-4">
                    <thead className="thead-light">
                        <tr>
                            <th>{t('titre')}</th>
                            <th>{t('artiste')}</th>
                            <th>{t('categories')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pieces.map((piece) =>
                            <tr key={piece._id}>
                                <td>{piece.titre}</td>
                                <td>{piece.artiste}</td>
                                <td>{piece.categorie.map((categorie, index) =>
                                    <Button key={index} className="mx-1" variant="light" onClick={() => setRechercheCategorie(categorie)}>
                                        {categorie}
                                    </Button>
                                )}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </>
        );
    }
    else {
        return <Alert variant={"info"}>{t('repertoireVide')}</Alert>;
    }
}

export default ListePieces;