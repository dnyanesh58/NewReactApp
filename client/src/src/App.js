import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddEdit from './pages/AddEdit';
import Home from "./pages/Home";
import View from './pages/View';

function App() {
  return (
    <div className="App">
      <Router>
      <ToastContainer position='top-center'></ToastContainer>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/addContact" component={AddEdit}></Route>
          <Route exact path="/update/:id" component={AddEdit}></Route>
          <Route exact path="/view/:id" component={View}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
