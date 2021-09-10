import React from 'react';
import { cleanup, fireEvent, render, RenderResult, act, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserProfile from './UserProfile';
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

describe( 'UserProfile', () => {
    let userProfileProviderMock: GlobalContextProps,
        updatePasswordSpy: jest.SpyInstance<Promise<string>>,
        wrapper: RenderResult;

    const getRender = ( providerDataProps: GlobalProviderData ): RenderResult => {
        userProfileProviderMock = getGlobalProviderMockData( providerDataProps );

        return render(
            <Router>
                <Route>
                    <GlobalContext.Provider
                        value={userProfileProviderMock}>
                        <UserProfile />
                    </GlobalContext.Provider>
                </Route>
            </Router>
        );
    };

    beforeAll( () => {
        updatePasswordSpy = jest.spyOn( GlobalService, 'updatePassword' );
    });

    beforeEach( () => {
        const tkn = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJyb2xlIjoidXNlciIsImlkIjoyLCJpYXQiOjE2MzA5MzYyNDh9.ahoEWU36S8D0A-gaURZ5POnZOV092IpwXAozR6VpqQc';
        updatePasswordSpy.mockReturnValue( Promise.resolve( tkn ) );
    });

    afterEach( () => {
        cleanup();
        mockHistoryPush.mockReset();
        updatePasswordSpy.mockClear();
    });

    test( 'should render without error', () => {
        wrapper = getRender( getDefaultGlobalProviderDataProps() );
        const component = wrapper.baseElement.querySelector( '.user-profile' );
        expect( component ).toBeInTheDocument();
    });

    test( 'should call updatePassword function on submit button clicked', async () => {
        jest.useFakeTimers();
        const providerData = JSON.parse( JSON.stringify( getDefaultGlobalProviderDataProps() ) );
        wrapper = getRender( providerData );
        providerData.updatePassword = jest.fn().mockReturnValue( Promise.resolve() );

        const currentPasswordInput = wrapper.baseElement.querySelector( '.user-profile__form-current-password .MuiInputBase-input' );
        expect( currentPasswordInput ).toBeInTheDocument();
        if ( currentPasswordInput ) {
            fireEvent.change( currentPasswordInput, {
                target: { value: 'currentPassword' }
            });
        }

        const passwordInput = wrapper.baseElement.querySelector( '.user-profile__form-password .MuiInputBase-input' );
        expect( passwordInput ).toBeInTheDocument();
        if ( passwordInput ) {
            fireEvent.change( passwordInput, {
                target: { value: 'password' }
            });
        }

        const passwordConfirmInput = wrapper.baseElement.querySelector( '.user-profile__form-password-confirm .MuiInputBase-input' );
        expect( passwordConfirmInput ).toBeInTheDocument();
        if ( passwordConfirmInput ) {
            fireEvent.change( passwordConfirmInput, {
                target: { value: 'password' }
            });
        }

        const button = wrapper.baseElement.querySelector( '.user-profile__option .shr-button .MuiButtonBase-root' );
        expect( button ).toBeInTheDocument();
        if ( button ) {
            act( () => {
                fireEvent.click( button );
            });
        }

        await wait( () => {
            act( () => {
                jest.advanceTimersByTime( 10000 );
            });
        });
        expect( updatePasswordSpy ).toHaveBeenCalled();

        jest.clearAllTimers();
    });

    test( 'should not call updatePassword function on different password typed', () => {
        wrapper = getRender( getDefaultGlobalProviderDataProps() );

        const currentPasswordInput = wrapper.baseElement.querySelector( '.user-profile__form-current-password .MuiInputBase-input' );
        expect( currentPasswordInput ).toBeInTheDocument();
        if ( currentPasswordInput ) {
            fireEvent.change( currentPasswordInput, {
                target: { value: 'currentPassword' }
            });
        }

        const passwordInput = wrapper.baseElement.querySelector( '.user-profile__form-password .MuiInputBase-input' );
        expect( passwordInput ).toBeInTheDocument();
        if ( passwordInput ) {
            fireEvent.change( passwordInput, {
                target: { value: 'password' }
            });
        }

        const passwordConfirmInput = wrapper.baseElement.querySelector( '.user-profile__form-password-confirm .MuiInputBase-input' );
        expect( passwordConfirmInput ).toBeInTheDocument();
        if ( passwordConfirmInput ) {
            fireEvent.change( passwordConfirmInput, {
                target: { value: 'differentPassword' }
            });
        }

        const button = wrapper.baseElement.querySelector( '.user-profile__option .shr-button .MuiButtonBase-root' );
        expect( button ).toBeInTheDocument();
        if ( button ) {
            fireEvent.click( button );
        }

        expect( updatePasswordSpy ).not.toHaveBeenCalled();
    });

    test( 'should show new password error message', () => {
        wrapper = getRender( getDefaultGlobalProviderDataProps() );

        const currentPasswordInput = wrapper.baseElement.querySelector( '.user-profile__form-current-password .MuiInputBase-input' );
        expect( currentPasswordInput ).toBeInTheDocument();
        if ( currentPasswordInput ) {
            fireEvent.change( currentPasswordInput, {
                target: { value: 'currentPassword' }
            });
        }

        const passwordInput = wrapper.baseElement.querySelector( '.user-profile__form-password .MuiInputBase-input' );
        expect( passwordInput ).toBeInTheDocument();
        if ( passwordInput ) {
            fireEvent.change( passwordInput, {
                target: { value: 'currentPassword' }
            });
        }

        const passwordConfirmInput = wrapper.baseElement.querySelector( '.user-profile__form-password-confirm .MuiInputBase-input' );
        expect( passwordConfirmInput ).toBeInTheDocument();
        if ( passwordConfirmInput ) {
            fireEvent.change( passwordConfirmInput, {
                target: { value: 'currentPassword' }
            });
        }

        const button = wrapper.baseElement.querySelector( '.user-profile__option .shr-button .MuiButtonBase-root' );
        expect( button ).toBeInTheDocument();
        if ( button ) {
            fireEvent.click( button );
        }

        expect( updatePasswordSpy ).not.toHaveBeenCalled();
        const errorMessage = wrapper.baseElement.querySelector( '.user-profile__error' );
        expect( errorMessage?.textContent ).toEqual( '[update-profile.password-different]' );
    });

    test( 'should call updatePassword service and fails', async () => {
        updatePasswordSpy.mockClear();
        updatePasswordSpy.mockReturnValue( Promise.reject({ message: 'error' }) );

        const providerData = JSON.parse( JSON.stringify( getDefaultGlobalProviderDataProps() ) );
        providerData.email = undefined;
        wrapper = getRender( providerData );
        providerData.updatePassword = jest.fn().mockReturnValue( Promise.resolve() );

        const currentPasswordInput = wrapper.baseElement.querySelector( '.user-profile__form-current-password .MuiInputBase-input' );
        expect( currentPasswordInput ).toBeInTheDocument();
        if ( currentPasswordInput ) {
            fireEvent.change( currentPasswordInput, {
                target: { value: 'currentPassword' }
            });
        }

        const passwordInput = wrapper.baseElement.querySelector( '.user-profile__form-password .MuiInputBase-input' );
        expect( passwordInput ).toBeInTheDocument();
        if ( passwordInput ) {
            fireEvent.change( passwordInput, {
                target: { value: 'password' }
            });
        }

        const passwordConfirmInput = wrapper.baseElement.querySelector( '.user-profile__form-password-confirm .MuiInputBase-input' );
        expect( passwordConfirmInput ).toBeInTheDocument();
        if ( passwordConfirmInput ) {
            fireEvent.change( passwordConfirmInput, {
                target: { value: 'password' }
            });
        }

        const button = wrapper.baseElement.querySelector( '.user-profile__option .shr-button .MuiButtonBase-root' );
        expect( button ).toBeInTheDocument();
        if ( button ) {
            act( () => {
                fireEvent.click( button );
            });
        }

        await wait( () => {
            expect( updatePasswordSpy ).toHaveBeenCalled();
            const errorMessage = wrapper.baseElement.querySelector( '.user-profile__error' );
            expect( errorMessage ).toBeInTheDocument();
        });
    });

    test( 'should call updatePassword service, fails and show error message', async () => {
        updatePasswordSpy.mockClear();
        updatePasswordSpy.mockReturnValue( Promise.reject({ message: null }) );

        const providerData = JSON.parse( JSON.stringify( getDefaultGlobalProviderDataProps() ) );
        providerData.email = undefined;
        wrapper = getRender( providerData );
        providerData.updatePassword = jest.fn().mockReturnValue( Promise.resolve() );

        const currentPasswordInput = wrapper.baseElement.querySelector( '.user-profile__form-current-password .MuiInputBase-input' );
        expect( currentPasswordInput ).toBeInTheDocument();
        if ( currentPasswordInput ) {
            fireEvent.change( currentPasswordInput, {
                target: { value: 'currentPassword' }
            });
        }

        const passwordInput = wrapper.baseElement.querySelector( '.user-profile__form-password .MuiInputBase-input' );
        expect( passwordInput ).toBeInTheDocument();
        if ( passwordInput ) {
            fireEvent.change( passwordInput, {
                target: { value: 'password' }
            });
        }

        const passwordConfirmInput = wrapper.baseElement.querySelector( '.user-profile__form-password-confirm .MuiInputBase-input' );
        expect( passwordConfirmInput ).toBeInTheDocument();
        if ( passwordConfirmInput ) {
            fireEvent.change( passwordConfirmInput, {
                target: { value: 'password' }
            });
        }

        const button = wrapper.baseElement.querySelector( '.user-profile__option .shr-button .MuiButtonBase-root' );
        expect( button ).toBeInTheDocument();
        if ( button ) {
            act( () => {
                fireEvent.click( button );
            });
        }

        await wait( () => {
            expect( updatePasswordSpy ).toHaveBeenCalled();
            const errorMessage = wrapper.baseElement.querySelector( '.user-profile__error' );
            expect( errorMessage?.textContent ).toEqual( '[update-profile.password-error]' );
        });
    });
});
