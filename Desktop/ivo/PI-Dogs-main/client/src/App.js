import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/home/Home';
import DogDetails from './components/details/DogDetails';
import CreateDog from './components/create/CreateDog';
import Landing from './components/landing/Landing';


function App() {
  return (
   <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path='/home/createDog' component={CreateDog}/>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/home' component={Home} />
        <Route exact path='/home/:id' component={DogDetails}/>
      </Switch>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
