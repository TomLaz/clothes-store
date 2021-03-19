import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ShrHeader from './ShrHeader';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps, GlobalProviderData } from '../../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData } from '../../../providers/Global/Global.provider.mock';
import GlobalService from '../../../services/Global/Global.service';

const mockHistoryPush = jest.fn();

jest.mock( 'react-router-dom', () => ({
    ...jest.requireActual( 'react-router-dom' ),
    useHistory: (): { push: jest.Mock<any, any>; } => ({
        push: mockHistoryPush
    })
}) );

describe( 'ShrHeader', () => {
    let shrHeaderProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const shrHeaderProps = {
        showSignIn: true,
        showSignUp: true,
        showCategories: true
    };

    const getRender = ( providerDataProps: GlobalProviderData ): RenderResult => {
        shrHeaderProviderMock = getGlobalProviderMockData( providerDataProps );

        return render(
            <Router>
                <Route>
                    <GlobalContext.Provider
                        value={shrHeaderProviderMock}>
                        <ShrHeader {...shrHeaderProps} />
                    </GlobalContext.Provider>
                </Route>
            </Router>
        );
    };

    afterEach( () => {
        cleanup();
        mockHistoryPush.mockReset();
    });

    const providerDataProps = ( userLogged = true ): GlobalProviderData => {
        const providerDataProps = { ...getDefaultGlobalProviderDataProps() };
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
        const component = wrapper.baseElement.querySelector( '.shr-header' );
        expect( component ).toBeInTheDocument();
    });

    describe( 'Mobile', () => {
        describe( 'Mobile General', () => {
            test( 'should redirect to home page on mobile home menu button clicked', () => {
                wrapper = getRender( providerDataProps() );
                const mobileHomeMenuButton = wrapper.baseElement.querySelector( '.shr-header__mobile-menu-home' );
                expect( mobileHomeMenuButton ).toBeInTheDocument();
                if ( mobileHomeMenuButton ) {
                    fireEvent.click( mobileHomeMenuButton );
                }

                expect( shrHeaderProviderMock.updateActiveMenu ).toHaveBeenCalled();
                expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.home );
            });

            test( 'should redirect to favourites page on mobile favourites menu button clicked', () => {
                wrapper = getRender( providerDataProps() );
                const mobileFavouritesMenuButton = wrapper.baseElement.querySelector( '.shr-header__mobile-menu-favourites' );
                expect( mobileFavouritesMenuButton ).toBeInTheDocument();
                if ( mobileFavouritesMenuButton ) {
                    fireEvent.click( mobileFavouritesMenuButton );
                }

                expect( shrHeaderProviderMock.updateActiveMenu ).toHaveBeenCalled();
                expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.favourites );
            });

            test( 'should redirect to products page on mobile products menu button clicked', () => {
                wrapper = getRender( providerDataProps() );
                const mobileProductsMenuButton = wrapper.baseElement.querySelector( '.shr-header__mobile-menu-products' );
                expect( mobileProductsMenuButton ).toBeInTheDocument();
                if ( mobileProductsMenuButton ) {
                    fireEvent.click( mobileProductsMenuButton );
                }

                expect( shrHeaderProviderMock.updateActiveMenu ).toHaveBeenCalled();
                expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.products );
            });
        });

        describe( 'Mobile user logged', () => {
            test( 'should call updateActiveMenuItem on mobile home category button clicked', () => {
                wrapper = getRender( providerDataProps() );
                const homeCategoryButton = wrapper.baseElement.querySelector( '.shr-header__mobile-brand' );
                expect( homeCategoryButton ).toBeInTheDocument();
                if ( homeCategoryButton ) {
                    fireEvent.click( homeCategoryButton );
                }

                expect( shrHeaderProviderMock.updateActiveMenuItem ).toHaveBeenCalledWith( 'home' );
            });

            test( 'should call updateActiveMenu and redirect to favourites page on mobile favourites button clicked', () => {
                wrapper = getRender( providerDataProps() );
                const mobileFavouritesButton = wrapper.baseElement.querySelector( '.shr-header__mobile-favourites' );
                expect( mobileFavouritesButton ).toBeInTheDocument();
                if ( mobileFavouritesButton ) {
                    fireEvent.click( mobileFavouritesButton );
                }

                expect( shrHeaderProviderMock.updateActiveMenu ).toHaveBeenCalled();
                expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.favourites );
            });

            test( 'should redirect to basket page on mobile basket button clicked', () => {
                wrapper = getRender( providerDataProps() );
                const mobileBasketButton = wrapper.baseElement.querySelector( '.shr-header__mobile-basket' );
                expect( mobileBasketButton ).toBeInTheDocument();
                if ( mobileBasketButton ) {
                    fireEvent.click( mobileBasketButton );
                }

                expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.basket );
            });

            test( 'should toggle panel on mobile burger button clicked', async () => {
                wrapper = getRender( providerDataProps() );
                let mobileMenu = wrapper.baseElement.querySelector( '.shr-header__mobile-show' );
                expect( mobileMenu ).not.toBeInTheDocument();

                const mobileBurgerButton = wrapper.baseElement.querySelector( '.shr-header__mobile-burger' );
                expect( mobileBurgerButton ).toBeInTheDocument();
                if ( mobileBurgerButton ) {
                    fireEvent.click( mobileBurgerButton );
                }

                mobileMenu = wrapper.baseElement.querySelector( '.shr-header__mobile-show' );
                expect( mobileMenu ).toBeInTheDocument();
            });

            test( 'should call logout function on mobile logout button clicked', async () => {
                wrapper = getRender( providerDataProps() );
                const mobileLogoutButton = wrapper.baseElement.querySelector( '.shr-header__mobile-log-out .shr-button .MuiButtonBase-root' );
                expect( mobileLogoutButton ).toBeInTheDocument();
                if ( mobileLogoutButton ) {
                    fireEvent.click( mobileLogoutButton );
                }

                expect( shrHeaderProviderMock.logout ).toHaveBeenCalled();
            });

            test( 'should redirect to user profile page on mobile user profile button clicked', () => {
                wrapper = getRender( providerDataProps() );
                const mobileUserProfileButton =
                    wrapper.baseElement.querySelector( '.shr-header__mobile-user-profile .shr-button .MuiButtonBase-root' );
                expect( mobileUserProfileButton ).toBeInTheDocument();
                if ( mobileUserProfileButton ) {
                    fireEvent.click( mobileUserProfileButton );
                }

                expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.userProfile );
            });
        });

        describe( 'Mobile user not logged', () => {
            test( 'should redirect to sign up page on mobile signup button clicked', () => {
                wrapper = getRender( providerDataProps( false ) );

                const mobileSignUpButton = wrapper.baseElement.querySelector( '.shr-header__mobile-sign-up .shr-button .MuiButtonBase-root' );
                expect( mobileSignUpButton ).toBeInTheDocument();
                if ( mobileSignUpButton ) {
                    fireEvent.click( mobileSignUpButton );
                }

                expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.signUp );
            });

            test( 'should redirect to sign in page on mobile signin button clicked', () => {
                wrapper = getRender( providerDataProps( false ) );

                const mobileSignInButton = wrapper.baseElement.querySelector( '.shr-header__mobile-sign-in .shr-button .MuiButtonBase-root' );
                expect( mobileSignInButton ).toBeInTheDocument();
                if ( mobileSignInButton ) {
                    fireEvent.click( mobileSignInButton );
                }

                expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.signIn );
            });
        });
    });

    describe( 'Desktop', () => {
        describe( 'Desktop general', () => {
            test( 'should redirect to home page on desktop home button clicked', () => {
                wrapper = getRender( providerDataProps() );
                const desktopHomeButton = wrapper.baseElement.querySelector( '.shr-header__desktop-dev' );
                expect( desktopHomeButton ).toBeInTheDocument();
                if ( desktopHomeButton ) {
                    fireEvent.click( desktopHomeButton );
                }

                expect( shrHeaderProviderMock.updateActiveMenu ).toHaveBeenCalled();
                expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.home );
            });

            test( 'should redirect to products page on desktop category button clicked', () => {
                wrapper = getRender( providerDataProps() );
                const desktopCategoriesButton = wrapper.baseElement.querySelectorAll( '.shr-header__desktop-option' );
                expect( desktopCategoriesButton[0] ).toBeInTheDocument();
                if ( desktopCategoriesButton[0] ) {
                    fireEvent.click( desktopCategoriesButton[0] );
                }

                expect( shrHeaderProviderMock.updateActiveMenu ).toHaveBeenCalled();
                expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.products );
            });
        });

        describe( 'Desktop user logged', () => {
            test( 'should call logout function on desktop logout button clicked', async () => {
                wrapper = getRender( providerDataProps() );
                const desktopLogoutButton = wrapper.baseElement.querySelector( '.shr-header__desktop-logged .shr-button .MuiButtonBase-root' );
                expect( desktopLogoutButton ).toBeInTheDocument();
                if ( desktopLogoutButton ) {
                    fireEvent.click( desktopLogoutButton );
                }

                expect( shrHeaderProviderMock.logout ).toHaveBeenCalled();
            });

            test( 'should redirect to user profile page on desktop user profile button clicked', () => {
                wrapper = getRender( providerDataProps() );
                const desktopUserProfileButton = wrapper.baseElement.querySelector( '.shr-header__desktop-menu-profile' );
                expect( desktopUserProfileButton ).toBeInTheDocument();
                if ( desktopUserProfileButton ) {
                    fireEvent.click( desktopUserProfileButton );
                }

                expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.userProfile );
            });

            test( 'should redirect to favourites page on desktop favourites button clicked', () => {
                wrapper = getRender( providerDataProps() );
                const desktopFavouritesButton = wrapper.baseElement.querySelector( '.shr-header__desktop-menu-favourites' );
                expect( desktopFavouritesButton ).toBeInTheDocument();
                if ( desktopFavouritesButton ) {
                    fireEvent.click( desktopFavouritesButton );
                }

                expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.favourites );
            });

            test( 'should redirect to basket page on desktop basket button clicked', () => {
                wrapper = getRender( providerDataProps() );
                const desktopBasketButton = wrapper.baseElement.querySelector( '.shr-header__desktop-basket' );
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

                const desktopSignUpButton = wrapper.baseElement.querySelector( '.shr-header__desktop-sign-up .shr-button .MuiButtonBase-root' );
                expect( desktopSignUpButton ).toBeInTheDocument();
                if ( desktopSignUpButton ) {
                    fireEvent.click( desktopSignUpButton );
                }

                expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.signUp );
            });

            test( 'should redirect to sign in page on desktop signin button clicked', () => {
                wrapper = getRender( providerDataProps( false ) );

                const desktopSignInButton = wrapper.baseElement.querySelector( '.shr-header__desktop-sign-in .shr-button .MuiButtonBase-root' );
                expect( desktopSignInButton ).toBeInTheDocument();
                if ( desktopSignInButton ) {
                    fireEvent.click( desktopSignInButton );
                }

                expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.signIn );
            });
        });
    });
});
