import React from 'react';
import { Route } from 'react-router-dom';
import { GlobalProvider } from '../../providers/Global/Global.provider';
import GlobalService from '../../services/Global/Global.service';
import Home from '../../components/Home/Home';
import SignUp from '../../components/SignUp/SignUp';
import SignIn from '../../components/SignIn/SignIn';

const GlobalContainer = (): JSX.Element => {
    return (
        <GlobalProvider>
            <Route
                exact path={GlobalService.states.home}
                component={Home} />

            <Route
                exact path={GlobalService.states.signUp}
                component={SignUp} />

            <Route
                exact path={GlobalService.states.signIn}
                component={SignIn} />
        </GlobalProvider>
    );
};

export default GlobalContainer;
