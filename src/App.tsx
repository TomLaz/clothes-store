import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GlobalProvider } from './providers/Global/Global.provider';
import GlobalService from './services/Global/Global.service';
import GlobalContainer from './container/Global/Global.container';

const App = (): JSX.Element => {
    return (
        <Router>
            <Switch>
                <GlobalProvider>
                    <Route
                        path={GlobalService.states.home + '*'}
                        component={GlobalContainer} />
                </GlobalProvider>
            </Switch>
        </Router>
    );
};

export default App;
