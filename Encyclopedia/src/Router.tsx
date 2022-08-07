import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './routes/Main';
function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
