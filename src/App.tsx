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
import AddProduct from './components/AddProduct/AddProduct';
import Basket from './components/Basket/Basket';
import Products from './components/Products/Products';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

const App = (): JSX.Element => {
    return (
        <Router>
            <ScrollToTop>
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

                        <Route
                            exact path={GlobalService.states.products}
                            component={Products} />

                        <PrivateRoute
                            exact={true}
                            path={GlobalService.states.uploadProduct}
                            component={UploadProduct} />

                        <PrivateRoute
                            exact={true}
                            path={GlobalService.states.userProfile}
                            component={UserProfile} />

                        <Route
                            exact path={GlobalService.states.addProduct + '/:id'}
                            component={AddProduct} />

                        <PrivateRoute
                            exact={true}
                            path={GlobalService.states.basket}
                            component={Basket} />
                    </GlobalProvider>
                </Switch>
            </ScrollToTop>
        </Router>
    );
};

export default App;
