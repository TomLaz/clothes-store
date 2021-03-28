import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddProduct from './AddProduct';
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

describe( 'AddProduct', () => {
    let addProductProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const getRender = ( id: string, providerDataProps: GlobalProviderData ): RenderResult => {
        addProductProviderMock = getGlobalProviderMockData( providerDataProps );

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
        wrapper = getRender( 'g1UBk', JSON.parse( JSON.stringify( getDefaultGlobalProviderDataProps() ) ) );
    });

    afterEach( () => {
        cleanup();
        mockHistoryPush.mockReset();
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
        let backdrop = wrapper.baseElement.querySelector( '.MuiBackdrop-root' );
        expect( backdrop ).not.toBeInTheDocument();

        const image = wrapper.baseElement.querySelector( '.add-product__main-left-container .add-product__image' );
        expect( image ).toBeInTheDocument();
        if ( image ) {
            fireEvent.click( image );
        }

        backdrop = wrapper.baseElement.querySelector( '.MuiBackdrop-root' );
        expect( backdrop ).toBeInTheDocument();
    });

    test( 'should add product to basket case', () => {
        const quantitySelectButton = wrapper.baseElement.querySelector( '.add-product__quantity .shr-select__select' );
        expect( quantitySelectButton ).toBeInTheDocument();
        if ( quantitySelectButton ) {
            fireEvent.change( quantitySelectButton, { target: { value: '1' }});
        }

        const button = wrapper.baseElement.querySelector( '.add-product__add .shr-button .MuiButtonBase-root' );
        expect( button ).toBeInTheDocument();
        if ( button ) {
            fireEvent.click ( button );
        }

        expect( addProductProviderMock.updateBasketProductsCollection ).toHaveBeenCalled();
    });

    test( 'should show No Product Found message', () => {
        cleanup();
        wrapper = getRender( 'notFound', getDefaultGlobalProviderDataProps() );
        const notFound = wrapper.baseElement.querySelector( '.add-product__not-found-box' );
        expect( notFound ).toBeInTheDocument();
    });

    test( 'should history push to home page', () => {
        cleanup();
        wrapper = getRender( 'notFound', getDefaultGlobalProviderDataProps() );

        const button = wrapper.baseElement.querySelector( '.add-product__not-found .MuiButtonBase-root' );
        expect( button ).toBeInTheDocument();
        if ( button ) {
            fireEvent.click( button );
        }

        expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.home );
    });

    test( 'should redirect to login page on null current user and button clicked', () => {
        cleanup();
        mockHistoryPush.mockReset();
        const providerDataProps = JSON.parse( JSON.stringify( getDefaultGlobalProviderDataProps() ) );
        providerDataProps.currentUser = null;
        wrapper = getRender( 'g1UBk', providerDataProps );

        const button = wrapper.baseElement.querySelector( '.add-product__add .shr-button .MuiButtonBase-root' );
        expect( button ).toBeInTheDocument();
        if ( button ) {
            fireEvent.click ( button );
        }

        expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.signIn );
    });
});
