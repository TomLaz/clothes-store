import React from 'react';
import { cleanup, fireEvent, render, RenderResult, act, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Basket from './Basket';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps, GlobalProviderData } from '../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData, mockGlobalProviderData } from '../../providers/Global/Global.provider.mock';
import GlobalService from '../../services/Global/Global.service';

describe( 'Basket', () => {
    let basketProviderMock: GlobalContextProps,
        updateBasketSpy: jest.SpyInstance<Promise<void>>,
        wrapper: RenderResult;

    const mockProviderData = mockGlobalProviderData();

    const getRender = ( providerDataProps?: GlobalProviderData ): RenderResult => {
        basketProviderMock = getGlobalProviderMockData( providerDataProps || getDefaultGlobalProviderDataProps() );

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

    beforeAll( () => {
        mockProviderData.spyMocks();
        updateBasketSpy = jest.spyOn( GlobalService, 'updateBasket' );
    });

    beforeEach( () => {
        mockProviderData.resolveMocks();
        updateBasketSpy.mockReturnValue( Promise.resolve() );
    });

    afterEach( () => {
        cleanup();
        mockProviderData.mocksClear();
        updateBasketSpy.mockClear();
    });

    test( 'should render without error', () => {
        wrapper = getRender();

        const component = wrapper.baseElement.querySelector( '.basket' );
        expect( component ).toBeInTheDocument();
    });

    test( 'should call updateBasketProducts function on confirm remove product clicked', () => {
        wrapper = getRender();

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

        expect( updateBasketSpy ).toHaveBeenCalled();
    });

    test( 'should open remove product dialog, and close it', async () => {
        wrapper = getRender();

        const products = wrapper.baseElement.querySelectorAll( '.basket__products .product-detail' );
        const removeProductButton = products[0].querySelector( '.product-detail__svg' );
        expect( removeProductButton ).toBeInTheDocument();
        if ( removeProductButton ) {
            fireEvent.click( removeProductButton );
        }

        const closeDialogButton = document.body.querySelector( '.basket__dialog .MuiBackdrop-root' );
        expect( closeDialogButton ).toBeInTheDocument();
        if ( closeDialogButton ) {
            act( () => {
                fireEvent.click( closeDialogButton );
            });
        }

        await wait( () => {
            const dialog = document.body.querySelector( '.basket__dialog' );
            expect( dialog ).not.toBeInTheDocument();
        });
    });

    test( 'should not call updateBasketProducts function on cancel remove product clicked', () => {
        wrapper = getRender();

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

        expect( updateBasketSpy ).not.toHaveBeenCalled();
    });

    test( 'should render $0,00 in price total', () => {
        mockProviderData.globalProviderDataProps.products.length = 0;

        wrapper = getRender( mockProviderData.globalProviderDataProps );

        const total = wrapper.baseElement.querySelector( '.basket__total-price' );
        expect( total ).toBeInTheDocument();
        if ( total ) {
            expect( total.textContent ).toContain( '0,00' );
        }
    });

    test( 'should render spinner', () => {
        mockProviderData.globalProviderDataProps.email = null;

        wrapper = getRender( mockProviderData.globalProviderDataProps );

        const spinner = wrapper.baseElement.querySelector( '.shr-spinner' );
        expect( spinner ).toBeInTheDocument();
    });
});
