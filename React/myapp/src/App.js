import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './routes/Home';
import Detail from './routes/Detail';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/movie/:id">
          <Detail />
        </Route>
<<<<<<< HEAD
        <Route path="/">
          <Home />
        </Route>

        {/*<Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
        <Route path="/movie/:id">
          <Detail />
        </Route> */}
=======

        <Route path="/">
          <Home />
        </Route>
>>>>>>> 8d57d73bd7c5f230bde1ec9d320344c1431e95b5
      </Switch>
    </Router>
  );
}

export default App;
