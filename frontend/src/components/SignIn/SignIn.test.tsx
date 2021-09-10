import React from 'react';
import { cleanup, fireEvent, render, RenderResult, act, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignIn from './SignIn';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps, GlobalProviderData } from '../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData } from '../../providers/Global/Global.provider.mock';
import GlobalService from '../../services/Global/Global.service';
import { BasketI, CategoryI, FavoritesI, ProductI } from '../../models/Global.model';

const mockHistoryPush = jest.fn();

jest.mock( 'react-router-dom', () => ({
    ...jest.requireActual( 'react-router-dom' ),
    useHistory: (): { push: jest.Mock<any, any>; } => ({
        push: mockHistoryPush
    })
}) );

describe( 'SignIn', () => {
    let signInProviderMock: GlobalContextProps,
        loginSpy: jest.SpyInstance<Promise<string>>,
        getRoleSpy: jest.SpyInstance<string>,
        getEmailSpy: jest.SpyInstance<string>,
        wrapper: RenderResult,
        getProductsSpy: jest.SpyInstance<Promise<ProductI[]>>,
        getCategoriesSpy: jest.SpyInstance<Promise<CategoryI[]>>,
        getFavoritesSpy: jest.SpyInstance<Promise<FavoritesI | undefined>>,
        getBasketSpy: jest.SpyInstance<Promise<BasketI | undefined>>,
        getIdSpy: jest.SpyInstance<string>;

    const mockProviderData = getDefaultGlobalProviderDataProps();

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

    beforeAll( () => {
        loginSpy = jest.spyOn( GlobalService, 'login' );
        getRoleSpy = jest.spyOn( GlobalService, 'getRole' );
        getEmailSpy = jest.spyOn( GlobalService, 'getEmail' );
        getProductsSpy = jest.spyOn( GlobalService, 'getProducts' );
        getCategoriesSpy = jest.spyOn( GlobalService, 'getCategories' );
        getFavoritesSpy = jest.spyOn( GlobalService, 'getFavorites' );
        getBasketSpy = jest.spyOn( GlobalService, 'getBasket' );
        getIdSpy = jest.spyOn( GlobalService, 'getId' );
    });

    beforeEach( () => {
        loginSpy.mockReturnValue( Promise.resolve( 'success' ) );
        getProductsSpy.mockReturnValue( Promise.resolve( mockProviderData.products ) );
        getCategoriesSpy.mockReturnValue( Promise.resolve( mockProviderData.categories ) );
        getFavoritesSpy.mockReturnValue( Promise.resolve( mockProviderData.favourites ) );
        getBasketSpy.mockReturnValue( Promise.resolve( mockProviderData.basket ) );
        getRoleSpy.mockReturnValue( 'success' );
        getEmailSpy.mockReturnValue( 'success' );
        getIdSpy.mockReturnValue( 'success' );
    });

    afterEach( () => {
        cleanup();
        mockHistoryPush.mockReset();
        loginSpy.mockClear();
        getRoleSpy.mockClear();
        getEmailSpy.mockClear();
        getProductsSpy.mockClear();
        getCategoriesSpy.mockClear();
        getFavoritesSpy.mockClear();
        getBasketSpy.mockClear();
        getIdSpy.mockClear();
    });

    test( 'should render without error', () => {
        wrapper = getRender( mockProviderData );
        const component = wrapper.baseElement.querySelector( '.sign-in' );
        expect( component ).toBeInTheDocument();
    });

    test( 'should call login function', async () => {
        wrapper = getRender( mockProviderData );

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
            expect( loginSpy ).toHaveBeenCalled();
            expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.home );
        });
    });

    test( 'should login fails', async () => {
        loginSpy.mockClear();
        loginSpy.mockReturnValue( Promise.reject() );

        wrapper = getRender( mockProviderData );

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
            const errorWrapper = wrapper.baseElement.querySelector( '.sign-in__error' );
            expect( errorWrapper ).toBeInTheDocument();
        });
    });

    test( 'should getRole service fails', async () => {
        getFavoritesSpy.mockClear();
        getFavoritesSpy.mockReturnValue( Promise.reject( '' ) );

        wrapper = getRender( mockProviderData );

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
            expect( getRoleSpy ).not.toHaveBeenCalled();
            expect( getEmailSpy ).not.toHaveBeenCalled();
        });
    });

    test( 'should call getId service', async () => {
        getFavoritesSpy.mockClear();
        getFavoritesSpy.mockReturnValue( Promise.resolve( undefined ) );
        getBasketSpy.mockClear();
        getBasketSpy.mockReturnValue( Promise.resolve( undefined ) );

        wrapper = getRender( mockProviderData );

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
            expect( loginSpy ).toHaveBeenCalled();
            expect( getIdSpy ).toHaveBeenCalled();
            expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.home );
        });
    });
});
