import React from 'react';
import { cleanup, fireEvent, render, RenderResult, act, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUp from './SignUp';
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

describe( 'SignUp', () => {
    let signUpProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const getRender = ( providerDataProps: GlobalProviderData ): RenderResult => {
        signUpProviderMock = getGlobalProviderMockData( providerDataProps );

        return render(
            <Router>
                <Route>
                    <GlobalContext.Provider
                        value={signUpProviderMock}>
                        <SignUp />
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
        const component = wrapper.baseElement.querySelector( '.sign-up' );
        expect( component ).toBeInTheDocument();
    });

    test( 'should call signup function & redirect to sign in page on submit button clicked', async () => {
        wrapper = getRender( getDefaultGlobalProviderDataProps() );
        const emailInput = wrapper.baseElement.querySelector( '.sign-up__form-email .MuiInputBase-input' );
        expect( emailInput ).toBeInTheDocument();
        if ( emailInput ) {
            fireEvent.change( emailInput, {
                target: { value: 'field@email.com' }
            });
        }

        const passwordInput = wrapper.baseElement.querySelector( '.sign-up__form-password .MuiInputBase-input' );
        expect( passwordInput ).toBeInTheDocument();
        if ( passwordInput ) {
            fireEvent.change( passwordInput, {
                target: { value: 'password' }
            });
        }

        const passwordConfirmInput = wrapper.baseElement.querySelector( '.sign-up__form-password-confirm .MuiInputBase-input' );
        expect( passwordConfirmInput ).toBeInTheDocument();
        if ( passwordConfirmInput ) {
            fireEvent.change( passwordConfirmInput, {
                target: { value: 'password' }
            });
        }

        const button = wrapper.baseElement.querySelector( '.sign-up__submit-button' );
        expect( button ).toBeInTheDocument();
        if ( button ) {
            act( () => {
                fireEvent.click( button );
            });
        }

        await wait( () => {
            expect( signUpProviderMock.signup ).toHaveBeenCalled();
            expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.signIn );
        });
    });

    test( 'should not call signup function on different password typed', async () => {
        wrapper = getRender( getDefaultGlobalProviderDataProps() );
        const emailInput = wrapper.baseElement.querySelector( '.sign-up__form-email .MuiInputBase-input' );
        expect( emailInput ).toBeInTheDocument();
        if ( emailInput ) {
            fireEvent.change( emailInput, {
                target: { value: 'field@email.com' }
            });
        }

        const passwordInput = wrapper.baseElement.querySelector( '.sign-up__form-password .MuiInputBase-input' );
        expect( passwordInput ).toBeInTheDocument();
        if ( passwordInput ) {
            fireEvent.change( passwordInput, {
                target: { value: 'password' }
            });
        }

        const passwordConfirmInput = wrapper.baseElement.querySelector( '.sign-up__form-password-confirm .MuiInputBase-input' );
        expect( passwordConfirmInput ).toBeInTheDocument();
        if ( passwordConfirmInput ) {
            fireEvent.change( passwordConfirmInput, {
                target: { value: 'differentPassword' }
            });
        }

        const button = wrapper.baseElement.querySelector( '.sign-up__submit-button' );
        expect( button ).toBeInTheDocument();
        if ( button ) {
            act( () => {
                fireEvent.click( button );
            });
        }

        await wait( () => {
            expect( signUpProviderMock.signup ).not.toHaveBeenCalled();
        });
    });
});
