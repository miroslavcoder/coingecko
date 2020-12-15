import './App.css';
import CoinList from './Components/CoinList/CoinList';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Bookmark from './Components/Bookmark/Bookmark';
import CoinDetail from './Components/CoinDetail/CoinDetail';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={CoinList} />
          <Route path='/bookmark' component={Bookmark} />
          <Route path='/detail/:id' component={CoinDetail} />
        </Switch>
    </Router>
  );
}

export default App;
