import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../providers/Global/Global.provider';
import GlobalService from '../../services/Global/Global.service';

type PrivateRouteProps = {
    path: string;
    component: React.FC;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ( props: any ) => {
    const globalContext = useContext( GlobalContext );
    const { component: Component, path } = props;

    return (
        <Route
            exact
            path={path}
            render={ (): JSX.Element => {
                return globalContext.data.currentUser ?
                    <Component /> :
                    <Redirect to={GlobalService.states.signIn} />;
            }}
        />
    );
};

export default PrivateRoute;
