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
    const { data: { currentUser }} = useContext( GlobalContext );

    return (
        <Route
            exact={exact}
            path={path}
            render={ (): JSX.Element => {
                return (
                    currentUser === undefined ?
                        <ShrLayout
                            showSignIn={false}
                            showSignUp={false}
                            showCategories={true}>
                            <ShrSpinner />
                        </ShrLayout> :
                        currentUser === null ?
                            <SignIn /> :
                            <Component />
                );
            }}
        />
    );
};

export default PrivateRoute;
