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
        registerSpy: jest.SpyInstance<Promise<string>>,
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

    beforeAll( () => {
        registerSpy = jest.spyOn( GlobalService, 'register' );
    });

    beforeEach( () => {
        const tkn = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJyb2xlIjoidXNlciIsImlkIjoyLCJpYXQiOjE2MzA5MzYyNDh9.ahoEWU36S8D0A-gaURZ5POnZOV092IpwXAozR6VpqQc';
        registerSpy.mockReturnValue( Promise.resolve( tkn ) );
    });

    afterEach( () => {
        cleanup();
        mockHistoryPush.mockReset();
        registerSpy.mockClear();
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
            expect( registerSpy ).toHaveBeenCalled();
            expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.home );
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
            expect( registerSpy ).not.toHaveBeenCalled();
        });
    });

    test( 'should call signup function and show bd error message', async () => {
        registerSpy.mockReset();
        const errorValue = 'error';
        registerSpy.mockReturnValue( Promise.reject({
            message: errorValue
        }) );

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
            expect( registerSpy ).toHaveBeenCalled();
            expect( mockHistoryPush ).not.toHaveBeenCalledWith( GlobalService.states.home );

            const errorMessage = wrapper.baseElement.querySelector( '.sign-up__error' );
            expect( errorMessage ).toBeInTheDocument();
            expect( errorMessage?.textContent ).toEqual( errorValue );
        });
    });

    test( 'should call signup function and show default error message', async () => {
        registerSpy.mockReset();
        registerSpy.mockReturnValue( Promise.reject({
            message: undefined
        }) );

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
            expect( registerSpy ).toHaveBeenCalled();
            expect( mockHistoryPush ).not.toHaveBeenCalledWith( GlobalService.states.home );

            const errorMessage = wrapper.baseElement.querySelector( '.sign-up__error' );
            expect( errorMessage ).toBeInTheDocument();
            expect( errorMessage?.textContent ).toEqual( '[sign-up.error]' );
        });
    });
});
