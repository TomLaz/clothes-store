import React, { useContext } from 'react';
import './PrivateRoute.scss';
import { Route } from 'react-router-dom';
import { GlobalContext } from '../../providers/Global/Global.provider';
import SignIn from '../SignIn/SignIn';
import ShrHeader from '../shared/ShrHeader/ShrHeader';
import ShrFooter from '../shared/ShrFooter/ShrFooter';
import ShrSpinner from '../shared/ShrSpinner/ShrSpinner';

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
                        <div className='private-route__loading'>
                            <ShrHeader
                                showSignIn={false}
                                showSignUp={false}
                                showCategories={true} />
                            <ShrSpinner />
                            <ShrFooter />
                        </div> :
                        currentUser === null ?
                            <SignIn /> :
                            <Component />
                );
            }}
        />
    );
};

export default PrivateRoute;
