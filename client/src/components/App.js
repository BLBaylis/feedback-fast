import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';

const dummyComp1 = () => <h1>Hi from 1</h1>;
const dummyComp2 = () => <h1>Hi from 2</h1>;
const dummyComp3 = () => <h1>Hi from 3</h1>;
const dummyComp4 = () => <h1>Hi from 4</h1>;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/1" exact component={dummyComp1} />
          <Route path="/2" exact component={dummyComp2} />
          <Route path="/3" exact component={dummyComp3} />
          <Route path="/4" exact component={dummyComp4} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
