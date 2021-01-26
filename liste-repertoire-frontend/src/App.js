import PageAccueil from './pages/PageAccueil';
import PageRepertoire from './pages/PageRepertoire';
import PageAdmin from './pages/PageAdmin';
import PageAjouter from './pages/PageAjouter';
import PageModifier from './pages/PageModifier';
import PageSupprimer from './pages/PageSupprimer';
import PageDemande from './pages/PageDemande';
import PageAfficherDemande from './pages/PageAfficherDemande';
import PageInscription from './pages/PageInscription';
import Page404 from './pages/Page404';
import BarreNavigation from './composants/BarreNavigation';
import PageConnexion from './pages/PageConnexion';
import PageGestionPourUtilisateur from './pages/PageGestionPourUtilisateur';
import { ContexteAuth } from './context/Auth';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import {
  React,
  useState, 
} from 'react';

function App() {
  const [authentification, setAuthentification]  = useState(false);
  const [estAdmin, setEstAdmin]  = useState(false); 
  const [username, setUsername]  = useState(false); 

  return (
    <ContexteAuth.Provider value={{authentification, setAuthentification, estAdmin, setEstAdmin, 
      username, setUsername}}>
      <Router>
        <Container>
          <BarreNavigation />
          <Switch>
            <Route path="/" component={PageAccueil} exact />
            <Route path="/repertoire" component={PageRepertoire} />
            <Route path="/admin" component={PageAdmin} />
            <Route path="/demande" component={PageDemande} />
            <Route path="/modifier/:id" component={PageModifier} />
            <Route path="/supprimer/:id" component={PageSupprimer} />
            <Route path="/ajouter" component={PageAjouter} />
            <Route path="/afficher" component={PageAfficherDemande} />
            <Route path="/inscription" component={PageInscription} />
            <Route path="/connexion" component={PageConnexion} />
            <Route path="/gestionDemandesUtilisateur" component={PageGestionPourUtilisateur}/>
            <Route component={Page404} />
          </Switch>
        </Container>
      </Router>
    </ContexteAuth.Provider>
  );
}

export default App;
