import {
  React,
  useState,
  useEffect
} from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';

function PageGestionUsager() {
  const [rafraichir, setRafraichir] = useState(false);
  const [listeUsagers, setListeUsager] = useState([]);
  useEffect(() => {
    const chercherDonnees = async () => {
      const resultat = await fetch('/api/utilisateurs');
      const body = await resultat.json().catch((error) => { console.log(error) });
      setListeUsager(body);
    };
    chercherDonnees();
  }, [rafraichir]);

  function promouvoirUsager(id, username, motPasse) {
    var estAdmin = "true";
    const chercherDonnees = async () => {
      await fetch(`/api/utilisateurs/modifier/${id}`, {
        method: 'put',
        body: JSON.stringify({ username, motPasse, estAdmin }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setRafraichir(!rafraichir);
    }
    chercherDonnees();
  }

  function supprimerUsager(id) {
    const chercherDonnees = async () => {
      await fetch(`/api/utilisateurs/supprimer/${id}`, {
        method: 'delete',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setRafraichir(!rafraichir);
    }
    chercherDonnees();
  }

  if (listeUsagers?.length) {
    return (
      <>
        <Alert className="mt-2" variant='primary'> Gestion des usagers</Alert>
        <Table bordered hover>
          <thead>
            <tr>
              <th align="center">#</th>
              <th align="center">Username</th>
              <th align="center">L'usager est admin</th>
              <th align="center">Promouvoir</th>
              <th align="center">Supprimer l'usager</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(listeUsagers).map((usager, index) => {
                return (
                  <tr key={index}>
                    <td align="center">{index + 1}</td>
                    <td align="center">{listeUsagers[usager].username}</td>
                    <td align="center">{listeUsagers[usager].estAdmin === "true"? "Oui" : "Non"}</td>
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
      </>
    );
  }
  else {
    return <h5 variant={"info"} >Aucun usager d'inscrit!</h5>;
  }
}

export default PageGestionUsager;