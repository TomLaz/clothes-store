import React, { useContext } from 'react';
import './PrivateRoute.scss';
import { Route } from 'react-router-dom';
import { GlobalContext } from '../../providers/Global/Global.provider';
import SignIn from '../SignIn/SignIn';

type PrivateRouteProps = {
    path: string;
    component: React.FC;
    exact: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ( props: any ) => {
    const globalContext = useContext( GlobalContext );
    const { component: Component, path, exact } = props;

    return (
        <Route
            exact={exact}
            path={path}
            render={ (): JSX.Element => {
                return globalContext.data.currentUser ?
                    <Component /> :
                    <SignIn />;
            }}
        />
    );
};

export default PrivateRoute;
