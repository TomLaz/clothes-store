import React from 'react';
import { cleanup, fireEvent, render, RenderResult, act, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignIn from './SignIn';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps, GlobalProviderData } from '../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData } from '../../providers/Global/Global.provider.mock';
import GlobalService from '../../services/Global/Global.service';

const mockHistoryPush = jest.fn();

jest.mock( 'react-router-dom', () => ({
    ...jest.requireActual( 'react-router-dom' ),
    useHistory: (): { push: jest.Mock<any, any>; } => ({
        push: mockHistoryPush
    })
}) );

describe( 'SignIn', () => {
    let signInProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const signInProps = {
        shouldRedirect: true
    };

    const getRender = ( providerDataProps: GlobalProviderData ): RenderResult => {
        signInProviderMock = getGlobalProviderMockData( providerDataProps );

        return render(
            <Router>
                <Route>
                    <GlobalContext.Provider
                        value={signInProviderMock}>
                        <SignIn {...signInProps} />
                    </GlobalContext.Provider>
                </Route>
            </Router>
        );
    };

    afterEach( () => {
        cleanup();
        mockHistoryPush.mockReset();
    });

    test( 'should render without error', () => {
        wrapper = getRender( getDefaultGlobalProviderDataProps() );
        const component = wrapper.baseElement.querySelector( '.sign-in' );
        expect( component ).toBeInTheDocument();
    });

    test( 'should render without error', async () => {
        wrapper = getRender( getDefaultGlobalProviderDataProps() );
        const emailInput = wrapper.baseElement.querySelector( '.sign-in__form-email .MuiInputBase-input' );
        expect( emailInput ).toBeInTheDocument();
        if ( emailInput ) {
            fireEvent.change( emailInput, {
                target: { value: 'field@email.com' }
            });
        }

        const passwordInput = wrapper.baseElement.querySelector( '.sign-in__form-password .MuiInputBase-input' );
        expect( passwordInput ).toBeInTheDocument();
        if ( passwordInput ) {
            fireEvent.change( passwordInput, {
                target: { value: 'password' }
            });
        }

        const button = wrapper.baseElement.querySelector( '.sign-in__submit-button' );
        expect( button ).toBeInTheDocument();
        if ( button ) {
            act( () => {
                fireEvent.click( button );
            });
        }

        await wait( () => {
            expect( signInProviderMock.login ).toHaveBeenCalled();
            expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.home );
        });
    });
});
