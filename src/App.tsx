import React, { Suspense, lazy } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GlobalProvider } from './providers/Global/Global.provider';
import GlobalService from './services/Global/Global.service';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ShrSpinner from './components/shared/ShrSpinner/ShrSpinner';
import ShrLayout from './components/shared/ShrLayout/ShrLayout';

const Home = lazy( () => import( './components/Home/Home' ) );
const SignUp = lazy( () => import( './components/SignUp/SignUp' ) );
const SignIn = lazy( () => import( './components/SignIn/SignIn' ) );
const UserProfile = lazy( () => import( './components/UserProfile/UserProfile' ) );
const AddProduct = lazy( () => import( './components/AddProduct/AddProduct' ) );
const Basket = lazy( () => import( './components/Basket/Basket' ) );
const Products = lazy( () => import( './components/Products/Products' ) );
const ForgotPassword = lazy( () => import( './components/ForgotPassword/ForgotPassword' ) );
const Favourites = lazy( () => import( './components/Favourites/Favourites' ) );

const App = (): JSX.Element => {
    const loading = (
        <ShrLayout
            showSignIn={false}
            showSignUp={false}
            showCategories={true}>
            <ShrSpinner />
        </ShrLayout>
    );

    return (
        <Router>
            <ScrollToTop>
                <Suspense fallback={loading}>
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
                                path={GlobalService.states.userProfile}
                                component={UserProfile} />

                            <Route
                                exact path={GlobalService.states.addProduct + '/:id'}
                                component={AddProduct} />

                            <PrivateRoute
                                exact={true}
                                path={GlobalService.states.basket}
                                component={Basket} />

                            <PrivateRoute
                                exact={true}
                                path={GlobalService.states.favourites}
                                component={Favourites} />
                        </GlobalProvider>
                    </Switch>
                </Suspense>
            </ScrollToTop>
        </Router>
    );
};

export default App;
