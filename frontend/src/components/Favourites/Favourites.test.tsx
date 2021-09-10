import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Favourites from './Favourites';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps, GlobalProviderData } from '../../providers/Global/Global.provider';
import { getGlobalProviderMockData, mockGlobalProviderData } from '../../providers/Global/Global.provider.mock';
import GlobalService from '../../services/Global/Global.service';

describe( 'Favourites', () => {
    let favouritesProviderMock: GlobalContextProps,
        updateFavouritesSpy: jest.SpyInstance<Promise<void>>,
        wrapper: RenderResult;

    const mockProviderData = mockGlobalProviderData();

    const getRender = ( providerData: GlobalProviderData ): RenderResult => {
        favouritesProviderMock = getGlobalProviderMockData( providerData );

        return render(
            <Router>
                <Route>
                    <GlobalContext.Provider
                        value={favouritesProviderMock}>
                        <Favourites />
                    </GlobalContext.Provider>
                </Route>
            </Router>
        );
    };

    beforeAll( () => {
        mockProviderData.spyMocks();
        updateFavouritesSpy = jest.spyOn( GlobalService, 'updateFavourites' );
    });

    beforeEach( () => {
        mockProviderData.resolveMocks();
        updateFavouritesSpy.mockReturnValue( Promise.resolve() );
    });

    afterEach( () => {
        cleanup();
        mockProviderData.mocksClear();
        updateFavouritesSpy.mockClear();
    });

    test( 'should render without error', () => {
        wrapper = getRender( mockProviderData.globalProviderDataProps );

        const component = wrapper.baseElement.querySelector( '.favourites' );
        expect( component ).toBeInTheDocument();
    });

    test( 'should call updateFavourites function on confirm remove favorite', () => {
        wrapper = getRender( mockProviderData.globalProviderDataProps );

        let confirmRemoveButton = document.body.querySelector( '.favourites__dialog .favourites__confirm-remove' );
        expect( confirmRemoveButton ).not.toBeInTheDocument();

        const favouriteItems = wrapper.baseElement.querySelectorAll( '.favourites__items .product-detail' );
        const removeItemButton = favouriteItems[0].querySelector( '.product-detail__svg' );
        expect( removeItemButton ).toBeInTheDocument();
        if ( removeItemButton ) {
            fireEvent.click( removeItemButton );
        }

        confirmRemoveButton = document.body.querySelector( '.favourites__dialog .favourites__confirm-remove' );
        expect( confirmRemoveButton ).toBeInTheDocument();
        if ( confirmRemoveButton ) {
            fireEvent.click( confirmRemoveButton );
        }

        expect( updateFavouritesSpy ).toHaveBeenCalled();
    });

    test( 'should not call updateBasketProducts function on cancel remove product', () => {
        wrapper = getRender( mockProviderData.globalProviderDataProps );

        let cancelRemoveButton = document.body.querySelector( '.favourites__dialog .favourites__cancel-remove' );
        expect( cancelRemoveButton ).not.toBeInTheDocument();

        const favouriteItems = wrapper.baseElement.querySelectorAll( '.favourites__items .product-detail' );
        const removeItemButton = favouriteItems[0].querySelector( '.product-detail__svg' );
        expect( removeItemButton ).toBeInTheDocument();
        if ( removeItemButton ) {
            fireEvent.click( removeItemButton );
        }

        cancelRemoveButton = document.body.querySelector( '.favourites__dialog .favourites__cancel-remove' );
        expect( cancelRemoveButton ).toBeInTheDocument();
        if ( cancelRemoveButton ) {
            fireEvent.click( cancelRemoveButton );
        }

        expect( updateFavouritesSpy ).not.toHaveBeenCalled();
    });

    test( 'should open and close modal backdrop', () => {
        wrapper = getRender( mockProviderData.globalProviderDataProps );

        let modal = document.body.querySelector( '.MuiBackdrop-root' );
        expect( modal ).not.toBeInTheDocument();

        const favouriteItems = wrapper.baseElement.querySelectorAll( '.favourites__items .product-detail' );
        const removeItemButton = favouriteItems[0].querySelector( '.product-detail__svg' );
        expect( removeItemButton ).toBeInTheDocument();
        if ( removeItemButton ) {
            fireEvent.click( removeItemButton );
        }

        modal = document.body.querySelector( '.MuiBackdrop-root' );
        expect( modal ).toBeInTheDocument();
        expect( modal ).toHaveStyle( 'opacity: 1' );
        if ( modal ) {
            fireEvent.click( modal );
        }

        modal = document.body.querySelector( '.MuiBackdrop-root' );
        expect( modal ).toHaveStyle( 'opacity: 0' );
    });

    test( 'should show spinner component', () => {
        const providerData = JSON.parse( JSON.stringify( mockProviderData.globalProviderDataProps ) );
        providerData.products = null;
        providerData.email = null;

        wrapper = getRender( providerData );

        const spinner = wrapper.baseElement.querySelector( '.shr-spinner' );
        expect( spinner ).toBeInTheDocument();
    });

    test( 'should show empty favourites message', () => {
        const providerData = JSON.parse( JSON.stringify( mockProviderData.globalProviderDataProps ) );
        providerData.favourites = null;

        wrapper = getRender( providerData );

        const empty = wrapper.baseElement.querySelector( '.favourites__empty' );
        expect( empty ).toBeInTheDocument();
    });

    test( 'should not render description on first favourite product', () => {
        const providerData = JSON.parse( JSON.stringify( mockProviderData.globalProviderDataProps ) );
        providerData.products[0].imgUrl = undefined;
        providerData.products[0].imgAlt = undefined;
        providerData.products[0].title = undefined;
        providerData.products[0].price = '';
        providerData.products[0].description = undefined;

        wrapper = getRender( providerData );

        const productDetails = wrapper.baseElement.querySelectorAll( '.product-detail' );

        const productDescriptionRendered = productDetails[1].querySelector( '.product-detail__description' );
        expect( productDescriptionRendered ).toBeInTheDocument();

        const productDescription = productDetails[0].querySelector( '.product-detail__description' );
        expect( productDescription ).not.toBeInTheDocument();
    });
});
