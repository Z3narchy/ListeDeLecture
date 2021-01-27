import { React, useState } from 'react';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

function ListePiecesAdmin({ pieces }) {
    const [tri, setTri] = useState('Titre');
    const [ordre, setOrdre] = useState('Croissant')

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
                            <Form.Label>Titre :</Form.Label>
                            <Form.Control type="search" value={rechercheTitre} onChange={(event) => setRechercheTitre(event.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Artiste :</Form.Label>
                            <Form.Control type="search" value={rechercheArtiste} onChange={(event) => setRechercheArtiste(event.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Catégorie :</Form.Label>
                            <Form.Control type="search" value={rechercheCategorie} onChange={(event) => setRechercheCategorie(event.target.value)} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Trier par :</Form.Label>
                            <Form.Control as="select" value={tri} onChange={(event) => setTri(event.target.value)}>
                                <option>Titre</option>
                                <option>Artiste</option>
                                <option>Catégorie</option>
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
                <Table bordered hover className="my-4">
                    <thead className="thead-light">
                        <tr>
                            <th>Titre</th>
                            <th>Artiste</th>
                            <th>Catégories</th>
                            <th>Actions</th>
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
                                <td>
                                    <Link to={`/modifier/${piece._id}`}>
                                        <Button variant="success" className="m-1" size="sm">Modifier</Button>
                                    </Link>
                                    <Link to={`/supprimer/${piece._id}`}>
                                        <Button variant="danger" className="m-1" size="sm">Supprimer</Button>
                                    </Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </>
        );
    }
    else {
        return <Alert variant={"info"} >Il n'y a pas de pièces dans le répertoire.</Alert>;
    }
}

export default ListePiecesAdmin;