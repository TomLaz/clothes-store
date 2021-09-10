import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MobileHeader from './MobileHeader';
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

describe( 'MobileHeader', () => {
    let mobileHeaderProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const getRender = ( providerDataProps: GlobalProviderData ): RenderResult => {
        mobileHeaderProviderMock = getGlobalProviderMockData( providerDataProps );

        return render(
            <Router>
                <MemoryRouter>
                    <Route>
                        <GlobalContext.Provider
                            value={mobileHeaderProviderMock}>
                            <MobileHeader />
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
            providerDataProps.email = undefined;
        }

        return providerDataProps;
    };

    test( 'should render without error', () => {
        wrapper = getRender( getDefaultGlobalProviderDataProps() );
        const component = wrapper.baseElement.querySelector( '.mobile-header' );
        expect( component ).toBeInTheDocument();
    });

    describe( 'Mobile General', () => {
        test( 'should redirect to home page on mobile home menu button clicked', () => {
            wrapper = getRender( providerDataProps() );
            const mobileHomeMenuButton = wrapper.baseElement.querySelector( '.mobile-header__menu-home' );
            expect( mobileHomeMenuButton ).toBeInTheDocument();
            if ( mobileHomeMenuButton ) {
                fireEvent.click( mobileHomeMenuButton );
            }

            expect( mobileHeaderProviderMock.updateActiveMenuItem ).toHaveBeenCalled();
            expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.home );
        });

        test( 'should redirect to favourites page on mobile favourites menu button clicked', () => {
            wrapper = getRender( providerDataProps() );
            const mobileFavouritesMenuButton = wrapper.baseElement.querySelector( '.mobile-header__menu-favourites' );
            expect( mobileFavouritesMenuButton ).toBeInTheDocument();
            if ( mobileFavouritesMenuButton ) {
                fireEvent.click( mobileFavouritesMenuButton );
            }

            expect( mobileHeaderProviderMock.updateActiveMenuItem ).toHaveBeenCalled();
            expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.favourites );
        });

        test( 'should redirect to products page on mobile products menu button clicked', () => {
            wrapper = getRender( providerDataProps() );
            const mobileProductsMenuButton = wrapper.baseElement.querySelector( '.mobile-header__menu-products' );
            expect( mobileProductsMenuButton ).toBeInTheDocument();
            if ( mobileProductsMenuButton ) {
                fireEvent.click( mobileProductsMenuButton );
            }

            expect( mobileHeaderProviderMock.updateActiveMenuItem ).toHaveBeenCalled();
            expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.products );
        });
    });

    describe( 'Mobile user logged', () => {
        test( 'should call updateActiveMenuItem on mobile home category button clicked', () => {
            wrapper = getRender( providerDataProps() );
            const homeCategoryButton = wrapper.baseElement.querySelector( '.mobile-header__brand' );
            expect( homeCategoryButton ).toBeInTheDocument();
            if ( homeCategoryButton ) {
                fireEvent.click( homeCategoryButton );
            }

            expect( mobileHeaderProviderMock.updateActiveMenuItem ).toHaveBeenCalledWith( 'home' );
        });

        test( 'should call updateActiveMenu and redirect to favourites page on mobile favourites button clicked', () => {
            wrapper = getRender( providerDataProps() );
            const mobileFavouritesButton = wrapper.baseElement.querySelector( '.mobile-header__favourites' );
            expect( mobileFavouritesButton ).toBeInTheDocument();
            if ( mobileFavouritesButton ) {
                fireEvent.click( mobileFavouritesButton );
            }

            expect( mobileHeaderProviderMock.updateActiveMenuItem ).toHaveBeenCalled();
            expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.favourites );
        });

        test( 'should redirect to basket page on mobile basket button clicked', () => {
            wrapper = getRender( providerDataProps() );
            const mobileBasketButton = wrapper.baseElement.querySelector( '.mobile-header__basket' );
            expect( mobileBasketButton ).toBeInTheDocument();
            if ( mobileBasketButton ) {
                fireEvent.click( mobileBasketButton );
            }

            expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.basket );
        });

        test( 'should toggle panel on mobile burger button clicked', async () => {
            wrapper = getRender( providerDataProps() );
            let mobileMenu = wrapper.baseElement.querySelector( '.mobile-header__show' );
            expect( mobileMenu ).not.toBeInTheDocument();

            const mobileBurgerButton = wrapper.baseElement.querySelector( '.mobile-header__burger' );
            expect( mobileBurgerButton ).toBeInTheDocument();
            if ( mobileBurgerButton ) {
                fireEvent.click( mobileBurgerButton );
            }

            mobileMenu = wrapper.baseElement.querySelector( '.mobile-header__show' );
            expect( mobileMenu ).toBeInTheDocument();
        });

        test( 'should call logout function on mobile logout button clicked', async () => {
            wrapper = getRender( providerDataProps() );
            const mobileLogoutButton = wrapper.baseElement.querySelector( '.mobile-header__log-out .shr-button .MuiButtonBase-root' );
            expect( mobileLogoutButton ).toBeInTheDocument();
            if ( mobileLogoutButton ) {
                fireEvent.click( mobileLogoutButton );
            }

            expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.signIn );
        });

        test( 'should redirect to user profile page on mobile user profile button clicked', () => {
            wrapper = getRender( providerDataProps() );
            const mobileUserProfileButton =
                wrapper.baseElement.querySelector( '.mobile-header__user-profile .shr-button .MuiButtonBase-root' );
            expect( mobileUserProfileButton ).toBeInTheDocument();
            if ( mobileUserProfileButton ) {
                fireEvent.click( mobileUserProfileButton );
            }

            expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.userProfile );
        });

        test( 'should render empty basket', () => {
            const providerData = JSON.parse( JSON.stringify( providerDataProps() ) );
            providerData.basket.products.length = 0;

            wrapper = getRender( providerData );

            const basketQty = wrapper.baseElement.querySelector( '.mobile-header__basket-qty' );
            expect( basketQty ).toBeInTheDocument();
            if ( basketQty ) {
                expect( basketQty.textContent ).toEqual( '0' );
            }
        });

        test( 'should render mobile-header__menu-favourites class', () => {
            const providerData = JSON.parse( JSON.stringify( providerDataProps() ) );
            providerData.activeMenu = { 'favourites': true };

            wrapper = getRender( providerData );

            const menuFavourites = wrapper.baseElement.querySelector( '.mobile-header__menu-favourites' );
            expect( menuFavourites ).toBeInTheDocument();
        });

        test( 'should render mobile-header__menu-favourites class', () => {
            const providerData = JSON.parse( JSON.stringify( providerDataProps() ) );
            providerData.activeMenu = { 'products': true };

            wrapper = getRender( providerData );

            const menuProducts = wrapper.baseElement.querySelector( '.mobile-header__menu-products' );
            expect( menuProducts ).toBeInTheDocument();
        });
    });

    describe( 'Mobile user not logged', () => {
        test( 'should redirect to sign up page on mobile signup button clicked', () => {
            wrapper = getRender( providerDataProps( false ) );

            const mobileSignUpButton = wrapper.baseElement.querySelector( '.mobile-header__sign-up .shr-button .MuiButtonBase-root' );
            expect( mobileSignUpButton ).toBeInTheDocument();
            if ( mobileSignUpButton ) {
                fireEvent.click( mobileSignUpButton );
            }

            expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.signUp );
        });

        test( 'should redirect to sign in page on mobile signin button clicked', () => {
            wrapper = getRender( providerDataProps( false ) );

            const mobileSignInButton = wrapper.baseElement.querySelector( '.mobile-header__sign-in .shr-button .MuiButtonBase-root' );
            expect( mobileSignInButton ).toBeInTheDocument();
            if ( mobileSignInButton ) {
                fireEvent.click( mobileSignInButton );
            }

            expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.signIn );
        });
    });
});
