import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Favourites from './Favourites';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps } from '../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData } from '../../providers/Global/Global.provider.mock';

describe( 'Favourites', () => {
    let favouritesProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const getRender = (): RenderResult => {
        favouritesProviderMock = getGlobalProviderMockData( getDefaultGlobalProviderDataProps() );

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

    beforeEach( () => {
        wrapper = getRender();
    });

    afterEach( () => {
        cleanup();
    });

    test( 'should render without error', () => {
        const component = wrapper.baseElement.querySelector( '.favourites' );
        expect( component ).toBeInTheDocument();
    });

    test( 'should call updateFavouritesCollection function on confirm remove favorite', () => {
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

        expect( favouritesProviderMock.updateFavouritesCollection ).toHaveBeenCalled();
    });

    test( 'should not call updateBasketProductsCollection function on cancel remove product', () => {
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

        expect( favouritesProviderMock.updateFavouritesCollection ).not.toHaveBeenCalled();
    });
});
