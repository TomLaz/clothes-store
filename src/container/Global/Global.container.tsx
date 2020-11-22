import React from 'react';
import { Route } from 'react-router-dom';
import { GlobalProvider } from '../../providers/Global/Global.provider';
import GlobalService from '../../services/Global/Global.service';
import Home from '../../components/Home/Home';
import SignUp from '../../components/SignUp/SignUp';
import SignIn from '../../components/SignIn/SignIn';
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword';
import UserProfile from '../../components/UserProfile/UserProfile';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';

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

            <Route
                exact path={GlobalService.states.forgotPassword}
                component={ForgotPassword} />

            <PrivateRoute
                path={GlobalService.states.userProfile}
                component={UserProfile} />
        </GlobalProvider>
    );
};

export default GlobalContainer;
