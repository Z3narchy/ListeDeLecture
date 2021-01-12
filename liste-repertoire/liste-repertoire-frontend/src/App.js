import PageAccueil from './pages/PageAccueil';
import PageRepertoire from './pages/PageRepertoire';
import PageAdmin from './pages/PageAdmin';
import PageAjouter from './pages/PageAjouter';
import PageModifier from './pages/PageModifier';
import PageSupprimer from './pages/PageSupprimer';
import Page404 from './pages/Page404';
import BarreNavigation from './composants/BarreNavigation';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Container>
        <BarreNavigation />
        <Switch>
          <Route path="/" component={PageAccueil} exact />
          <Route path="/repertoire" component={PageRepertoire} />
          <Route path="/admin" component={PageAdmin} />
          <Route path="/ajouter" component={PageAjouter} />
          <Route path="/modifier/:id" component={PageModifier} />
          <Route path="/supprimer/:id" component={PageSupprimer} />
          <Route component={Page404} />
        </Switch>        
      </Container>
    </Router>
  );
}

export default App;
