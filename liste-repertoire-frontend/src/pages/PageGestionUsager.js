import {
  React,
  useState,
  useEffect
} from 'react';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import { Redirect } from 'react-router-dom';

function PageGestionUsager() {
  const [rediriger, setRediriger] = useState(false);
  const [listeUsagers, setListeUsager] = useState([]);
  useEffect(() => {
    const chercherDonnees = async () => {
      const resultat = await fetch('/api/utilisateurs');
      const body = await resultat.json().catch((error) => { console.log(error) });
      setListeUsager(body);
    };
    chercherDonnees();
  }, []);

  function promouvoirUsager(id, username, motPasse) {
    var estAdminMod = true;
    const chercherDonnees = async () => {
      await fetch(`/api/utilisateurs/modifier/${id}`, {
        method: 'put',
        body: JSON.stringify({ username, motPasse, estAdminMod }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setRediriger(true);
    }
    chercherDonnees();
  }


  function supprimerUsager(id) {
    console.log(id);
    const chercherDonnees = async () => {
      await fetch(`/api/utilisateurs/supprimer/${id}`, {
        method: 'delete',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setRediriger(true);
    }
    chercherDonnees();
  }

  function AfficherRedirection() {
    if (rediriger === true) {
      return <Redirect to="/gestion" />
    }
  }

  if (listeUsagers?.length) {

    return (
      <>
      {AfficherRedirection()}
        <Container>
          <Alert variant='primary'> Gestion des usagers</Alert>
          <Table bordered hover>
            <thead>
              <tr>
                <th align="center">Décompte d'usager</th>
                <th align="center">Username</th>
                <th align="center">L'usager est admin</th>
                <th align="center">Promouvoir en status admin</th>
                <th align="center">Suprimer l'usager</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(listeUsagers).map((usager, index) => {
                  return (
                    <tr key={index}>
                      <td align="center">{index + 1}</td>
                      <td align="center">{listeUsagers[usager].username}</td>
                      <td align="center">{listeUsagers[usager].estAdmin}</td>
                      <td align="center">{(listeUsagers[usager].estAdmin === "false") ?
                        <Button variant="success" className="m-1" size="sm" onClick={() =>
                          promouvoirUsager(listeUsagers[usager]._id, listeUsagers[usager].username,
                            listeUsagers[usager].motPasse)} >Promouvoir admin</Button> : null}
                      </td>
                      <td align="center"><Button variant="danger" className="m-1" size="sm"
                        onClick={() => supprimerUsager(listeUsagers[usager]._id)} >Supprimer l'usager</Button>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>
        </Container>
      </>
    );
  }
  else {
    return <h5 variant={"info"} >Aucun usager d'inscrit!</h5>;
  }
}

export default PageGestionUsager;


// Ajouter dans App
// import PageGestionUsager from './pages/PageGestionUsager';
// <Route path="/gestion" component={PageGestionUsager} />


// Ajouter dans BarreNavigation
/*
<LinkContainer to="/gestion">
                        <Nav.Link>Gestion des usagers</Nav.Link>
                    </LinkContainer>


*/














