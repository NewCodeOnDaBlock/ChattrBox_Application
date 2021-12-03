
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import OnlineList from './components/OnlineList';

function App() {
  return (
    <BrowserRouter>

      <Link to="/"></Link>
      <Link to="/roomId"></Link>
      <Switch>
        <Route path="/:roomId">
          <Home OnlineList={OnlineList} />

        </Route>
        <Route path="/">
          <Home OnlineList={OnlineList} />
        </Route>
      </Switch>


    </BrowserRouter>
  );
}

export default App;
