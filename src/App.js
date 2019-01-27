import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import AddRecipe from './Components/AddRecipe';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.sass';


library.add(faTimes, faPencilAlt, faTrashAlt);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
         <Switch>
             <Route exact path="/" component={AddRecipe} />
         </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
