import React from 'react';
import NewIceCreamForm from './NewIceCreamForm';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import IceCreamList from './IceCreamList';



function App() {
  return(
    <div>
      <style jsx global>{`
            div {
                background-color: #f08a5d;
                color: red;
                text-align: center;
            }
            a {
              color: black;
            }
        `}</style>
      <Header/>
      <Switch>
        <Route exact path='/' component={IceCreamList} />
        <Route path='/newiceCream' component={NewIceCreamForm} />
      </Switch>
    </div>
  );
}

export default App;
