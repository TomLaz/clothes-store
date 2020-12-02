import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GlobalProvider } from './providers/Global/Global.provider';
import GlobalService from './services/Global/Global.service';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import UploadProduct from './components/UploadProduct/UploadProduct';
import UserProfile from './components/UserProfile/UserProfile';

const App = (): JSX.Element => {
    return (
        <Router>
            <Switch>
                <GlobalProvider>
                    <Route
                        exact path={GlobalService.states.home}
                        component={Home} />

                    <Route
                        exact path={GlobalService.states.signUp}
                        component={SignUp} />

                    <Route
                        exact path={GlobalService.states.signIn}
                        render={ (): JSX.Element => (
                            <SignIn shouldRedirect={true} />
                        )} />

                    <Route
                        exact path={GlobalService.states.forgotPassword}
                        component={ForgotPassword} />

                    <PrivateRoute
                        exact={true}
                        path={GlobalService.states.uploadProduct}
                        component={UploadProduct} />

                    <PrivateRoute
                        exact={true}
                        path={GlobalService.states.userProfile}
                        component={UserProfile} />
                </GlobalProvider>
            </Switch>
        </Router>
    );
};

export default App;
