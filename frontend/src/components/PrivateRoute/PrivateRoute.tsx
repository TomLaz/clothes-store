import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { GlobalContext } from '../../providers/Global/Global.provider';
import ShrLayout from '../shared/ShrLayout/ShrLayout';
import ShrSpinner from '../shared/ShrSpinner/ShrSpinner';
import SignIn from '../SignIn/SignIn';

type PrivateRouteProps = {
    path: string;
    component: React.FC;
    exact: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, path, exact }) => {
    const { data: { email }} = useContext( GlobalContext );

    return (
        <Route
            exact={exact}
            path={path}
            render={ (): JSX.Element => {
                return (
                    email === null ?
                        <ShrLayout
                            showSignIn={false}
                            showSignUp={false}
                            showCategories={true}>
                            <ShrSpinner />
                        </ShrLayout> :
                        email === undefined ?
                            <SignIn /> :
                            <Component />
                );
            }}
        />
    );
};

export default PrivateRoute;
