import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './assets/styles/main.scss';

import Landing from './components/Landing';
import Search from './components/Search';

class App extends React.Component {
    render() {
        return (
                <div className="App">
                    <Switch>

                        <Route exact path="/" component={Landing} />
                        <Route path="/search" component={Search} />

                    </Switch>
                </div>
        );
    }
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root'));
