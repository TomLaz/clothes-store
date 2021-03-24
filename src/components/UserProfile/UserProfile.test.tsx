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

    afterEach( () => {
        cleanup();
        mockHistoryPush.mockReset();
    });

    test( 'should render without error', () => {
        wrapper = getRender( getDefaultGlobalProviderDataProps() );
        const component = wrapper.baseElement.querySelector( '.user-profile' );
        expect( component ).toBeInTheDocument();
    });

    test( 'should call updatePassword function on submit button clicked', async () => {
        wrapper = getRender( getDefaultGlobalProviderDataProps() );
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
            expect( userProfileProviderMock.updatePassword ).toHaveBeenCalled();
        });
    });

    test( 'should not call updatePassword function on different password typed', () => {
        wrapper = getRender( getDefaultGlobalProviderDataProps() );
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

        expect( userProfileProviderMock.updatePassword ).not.toHaveBeenCalled();
    });
});
