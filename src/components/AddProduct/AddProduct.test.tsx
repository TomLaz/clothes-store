import React from 'react';
import { cleanup, fireEvent, render, RenderResult, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddProduct from './AddProduct';
import { BrowserRouter as Router, MemoryRouter, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps, GlobalProviderData } from '../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData } from '../../providers/Global/Global.provider.mock';

describe( 'AddProduct', () => {
    let addProductProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const getRender = ( defaultGlobalProviderDataProps: GlobalProviderData, id: string ): RenderResult => {
        addProductProviderMock = getGlobalProviderMockData( defaultGlobalProviderDataProps );

        return render(
            <Router>
                <MemoryRouter initialEntries={[ `/add-product/${id}` ]}>
                    <Route path='/add-product/:id'>
                        <GlobalContext.Provider
                            value={addProductProviderMock}>
                            <AddProduct />
                        </GlobalContext.Provider>
                    </Route>
                </MemoryRouter>
            </Router>
        );
    };

    beforeEach( () => {
        wrapper = getRender( getDefaultGlobalProviderDataProps(), 'g1UBk' );
    });

    afterEach( () => {
        cleanup();
    });

    test( 'should render without error', () => {
        const component = wrapper.baseElement.querySelector( '.add-product' );
        expect( component ).toBeInTheDocument();
    });

    test( 'should change selected size option', () => {
        let circularOptions = wrapper.baseElement.querySelectorAll( '.add-product__shr-circular-options-box .shr-circular-option__option' );
        expect( circularOptions[1] ).toBeInTheDocument();
        expect( circularOptions[1] ).not.toHaveClass( 'shr-circular-option__active' );
        if ( circularOptions[1] ) {
            fireEvent.click( circularOptions[1] );
        }
        circularOptions = wrapper.baseElement.querySelectorAll( '.add-product__shr-circular-options-box .shr-circular-option__option' );
        expect( circularOptions[1] ).toHaveClass( 'shr-circular-option__active' );
    });

    test( 'should open modal and show image', () => {
        let backdrop = wrapper.baseElement.querySelector( '.backdrop' );
        expect( backdrop ).not.toBeInTheDocument();

        const image = wrapper.baseElement.querySelector( '.add-product__main-left-container .add-product__image' );
        expect( image ).toBeInTheDocument();
        if ( image ) {
            fireEvent.click( image );
        }

        backdrop = wrapper.baseElement.querySelector( '.backdrop' );
        expect( backdrop ).toBeInTheDocument();
    });

    test( 'should add product to basket case', () => {
        jest.useFakeTimers();

        const button = wrapper.baseElement.querySelector( '.add-product__add .shr-button .MuiButtonBase-root' );
        expect( button ).toBeInTheDocument();
        if ( button ) {
            fireEvent.click ( button );
        }

        act( () => {
            jest.advanceTimersByTime( 3500 );
        });
    });

    test( 'should show No Product Found message', () => {
        cleanup();
        wrapper = getRender( getDefaultGlobalProviderDataProps(), 'notFound' );
        const notFound = wrapper.baseElement.querySelector( '.add-product__not-found-box' );
        expect( notFound ).toBeInTheDocument();
    });
});
