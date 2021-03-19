import React from 'react';
import { cleanup, fireEvent, render, RenderResult, act, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ForgotPassword from './ForgotPassword';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps } from '../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData } from '../../providers/Global/Global.provider.mock';

describe( 'ForgotPassword', () => {
    let forgotPasswordProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const getRender = (): RenderResult => {
        forgotPasswordProviderMock = getGlobalProviderMockData( getDefaultGlobalProviderDataProps() );

        return render(
            <Router>
                <Route>
                    <GlobalContext.Provider
                        value={forgotPasswordProviderMock}>
                        <ForgotPassword />
                    </GlobalContext.Provider>
                </Route>
            </Router>
        );
    };

    beforeEach( () => {
        wrapper = getRender();
    });

    afterEach( () => {
        cleanup();
    });

    test( 'should render without error', () => {
        const component = wrapper.baseElement.querySelector( '.forgot-password' );
        expect( component ).toBeInTheDocument();
    });

    test( 'should call resetPassword function on button clicked', async () => {
        const emailField = wrapper.baseElement.querySelector( '.forgot-password .forgot-password__input-email #email' );
        expect( emailField ).toBeInTheDocument();
        if ( emailField ) {
            fireEvent.change( emailField, {
                target: { value: 'field@email.com' }
            });
        }

        const button = wrapper.baseElement.querySelector( '.forgot-password .forgot-password__button .MuiButtonBase-root' );
        expect( button ).toBeInTheDocument();
        if ( button ) {
            act( () => {
                fireEvent.click( button );
            });
        }

        await wait( () => {
            expect( forgotPasswordProviderMock.resetPassword ).toHaveBeenCalled();
        });
    });
});
