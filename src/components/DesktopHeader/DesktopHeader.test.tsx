import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DesktopHeader from './DesktopHeader';
import { BrowserRouter as Router, MemoryRouter, Route } from 'react-router-dom';
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

describe( 'DesktopHeader', () => {
    let desktopHeaderProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const getRender = ( providerDataProps: GlobalProviderData ): RenderResult => {
        desktopHeaderProviderMock = getGlobalProviderMockData( providerDataProps );

        return render(
            <Router>
                <MemoryRouter>
                    <Route>
                        <GlobalContext.Provider
                            value={desktopHeaderProviderMock}>
                            <DesktopHeader />
                        </GlobalContext.Provider>
                    </Route>
                </MemoryRouter>
            </Router>
        );
    };

    afterEach( () => {
        cleanup();
        mockHistoryPush.mockReset();
    });

    const providerDataProps = ( userLogged = true ): GlobalProviderData => {
        const providerDataProps = JSON.parse( JSON.stringify( getDefaultGlobalProviderDataProps() ) );
        providerDataProps.checkedFilters = {
            mens: true,
            womens: false
        };
        if ( !userLogged ) {
            providerDataProps.currentUser = undefined;
        }

        return providerDataProps;
    };

    test( 'should render without error', () => {
        wrapper = getRender( getDefaultGlobalProviderDataProps() );
        const component = wrapper.baseElement.querySelector( '.desktop-header' );
        expect( component ).toBeInTheDocument();
    });

    describe( 'Desktop general', () => {
        test( 'should redirect to home page on desktop home button clicked', () => {
            wrapper = getRender( providerDataProps() );
            const desktopHomeButton = wrapper.baseElement.querySelector( '.desktop-header__dev' );
            expect( desktopHomeButton ).toBeInTheDocument();
            if ( desktopHomeButton ) {
                fireEvent.click( desktopHomeButton );
            }

            expect( desktopHeaderProviderMock.updateActiveMenuItem ).toHaveBeenCalled();
            expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.home );
        });

        test( 'should redirect to products page on desktop category button clicked', () => {
            wrapper = getRender( providerDataProps() );
            const desktopCategoriesButton = wrapper.baseElement.querySelectorAll( '.desktop-header__option' );
            expect( desktopCategoriesButton[0] ).toBeInTheDocument();
            if ( desktopCategoriesButton[0] ) {
                fireEvent.click( desktopCategoriesButton[0] );
            }

            expect( desktopHeaderProviderMock.updateActiveMenuItem ).toHaveBeenCalled();
            expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.products );
        });
    });

    describe( 'Desktop user logged', () => {
        test( 'should call logout function on desktop logout button clicked', async () => {
            wrapper = getRender( providerDataProps() );
            const desktopLogoutButton = wrapper.baseElement.querySelector( '.desktop-header__logged .shr-button .MuiButtonBase-root' );
            expect( desktopLogoutButton ).toBeInTheDocument();
            if ( desktopLogoutButton ) {
                fireEvent.click( desktopLogoutButton );
            }

            expect( desktopHeaderProviderMock.logout ).toHaveBeenCalled();
        });

        test( 'should redirect to user profile page on desktop user profile button clicked', () => {
            wrapper = getRender( providerDataProps() );
            const desktopUserProfileButton = wrapper.baseElement.querySelector( '.desktop-header__menu-profile' );
            expect( desktopUserProfileButton ).toBeInTheDocument();
            if ( desktopUserProfileButton ) {
                fireEvent.click( desktopUserProfileButton );
            }

            expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.userProfile );
        });

        test( 'should redirect to favourites page on desktop favourites button clicked', () => {
            wrapper = getRender( providerDataProps() );
            const desktopFavouritesButton = wrapper.baseElement.querySelector( '.desktop-header__menu-favourites' );
            expect( desktopFavouritesButton ).toBeInTheDocument();
            if ( desktopFavouritesButton ) {
                fireEvent.click( desktopFavouritesButton );
            }

            expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.favourites );
        });

        test( 'should redirect to basket page on desktop basket button clicked', () => {
            wrapper = getRender( providerDataProps() );
            const desktopBasketButton = wrapper.baseElement.querySelector( '.desktop-header__basket' );
            expect( desktopBasketButton ).toBeInTheDocument();
            if ( desktopBasketButton ) {
                fireEvent.click( desktopBasketButton );
            }

            expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.basket );
        });
    });

    describe( 'Desktop user not logged', () => {
        test( 'should redirect to sign up page on desktop signup button clicked', () => {
            wrapper = getRender( providerDataProps( false ) );

            const desktopSignUpButton = wrapper.baseElement.querySelector( '.desktop-header__sign-up .shr-button .MuiButtonBase-root' );
            expect( desktopSignUpButton ).toBeInTheDocument();
            if ( desktopSignUpButton ) {
                fireEvent.click( desktopSignUpButton );
            }

            expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.signUp );
        });

        test( 'should redirect to sign in page on desktop signin button clicked', () => {
            wrapper = getRender( providerDataProps( false ) );

            const desktopSignInButton = wrapper.baseElement.querySelector( '.desktop-header__sign-in .shr-button .MuiButtonBase-root' );
            expect( desktopSignInButton ).toBeInTheDocument();
            if ( desktopSignInButton ) {
                fireEvent.click( desktopSignInButton );
            }

            expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.signIn );
        });
    });
});
