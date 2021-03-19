import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Basket from './Basket';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps } from '../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData } from '../../providers/Global/Global.provider.mock';

describe( 'Basket', () => {
    let basketProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const getRender = (): RenderResult => {
        basketProviderMock = getGlobalProviderMockData( getDefaultGlobalProviderDataProps() );

        return render(
            <Router>
                <Route>
                    <GlobalContext.Provider
                        value={basketProviderMock}>
                        <Basket />
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
        const component = wrapper.baseElement.querySelector( '.basket' );
        expect( component ).toBeInTheDocument();
    });

    test( 'should call updateBasketProductsCollection function on confirm remove product clicked', () => {
        let confirmRemoveButton = document.body.querySelector( '.basket__dialog .basket__confirm-remove' );
        expect( confirmRemoveButton ).not.toBeInTheDocument();

        const products = wrapper.baseElement.querySelectorAll( '.basket__products .product-detail' );
        const removeProductButton = products[0].querySelector( '.product-detail__svg' );
        expect( removeProductButton ).toBeInTheDocument();
        if ( removeProductButton ) {
            fireEvent.click( removeProductButton );
        }

        confirmRemoveButton = document.body.querySelector( '.basket__dialog .basket__confirm-remove' );
        expect( confirmRemoveButton ).toBeInTheDocument();
        if ( confirmRemoveButton ) {
            fireEvent.click( confirmRemoveButton );
        }

        expect( basketProviderMock.updateBasketProductsCollection ).toHaveBeenCalled();
    });

    test( 'should not call updateBasketProductsCollection function on cancel remove product clicked', () => {
        let cancelRemoveButton = document.body.querySelector( '.basket__dialog .basket__cancel-remove' );
        expect( cancelRemoveButton ).not.toBeInTheDocument();

        const products = wrapper.baseElement.querySelectorAll( '.basket__products .product-detail' );
        const removeProductButton = products[0].querySelector( '.product-detail__svg' );
        expect( removeProductButton ).toBeInTheDocument();
        if ( removeProductButton ) {
            fireEvent.click( removeProductButton );
        }

        cancelRemoveButton = document.body.querySelector( '.basket__dialog .basket__cancel-remove' );
        expect( cancelRemoveButton ).toBeInTheDocument();
        if ( cancelRemoveButton ) {
            fireEvent.click( cancelRemoveButton );
        }

        expect( basketProviderMock.updateBasketProductsCollection ).not.toHaveBeenCalled();
    });
});
