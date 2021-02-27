import React, { useContext } from 'react';
import './PrivateRoute.scss';
import { Route } from 'react-router-dom';
import { GlobalContext } from '../../providers/Global/Global.provider';
import SignIn from '../SignIn/SignIn';
import { CircularProgress } from '@material-ui/core';
import ShrHeader from '../shared/ShrHeader/ShrHeader';
import ShrFooter from '../shared/ShrFooter/ShrFooter';

type PrivateRouteProps = {
    path: string;
    component: React.FC;
    exact: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ( props: any ) => {
    const { data: { currentUser }} = useContext( GlobalContext );
    const { component: Component, path, exact } = props;

    return (
        <Route
            exact={exact}
            path={path}
            render={ (): JSX.Element => {
                return currentUser === undefined ?
                    <div className='private-route__loading'>
                        <ShrHeader
                            showSignIn={false}
                            showSignUp={false}
                            showCategories={true} />
                        <div className='private-route__spinner'>
                            <CircularProgress />
                        </div>
                        <ShrFooter />
                    </div> :
                    currentUser === null ?
                        <SignIn /> :
                        <Component />;
            }}
        />
    );
};

export default PrivateRoute;
