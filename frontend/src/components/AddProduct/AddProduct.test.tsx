import React from 'react';
import { cleanup, fireEvent, render, RenderResult, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddProduct from './AddProduct';
import { BrowserRouter as Router, MemoryRouter, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps, GlobalProviderData } from '../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData, mockGlobalProviderData } from '../../providers/Global/Global.provider.mock';
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
        updateBasketSpy: jest.SpyInstance<Promise<void>>,
        wrapper: RenderResult;

    const mockProviderData = mockGlobalProviderData();

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
        mockHistoryPush.mockReset();
    });

    test( 'should render without error', () => {
        wrapper = getRender( 'g1UBk', JSON.parse( JSON.stringify( mockProviderData.globalProviderDataProps ) ) );

        const component = wrapper.baseElement.querySelector( '.add-product' );
        expect( component ).toBeInTheDocument();
    });

    test( 'should change selected size option', () => {
        wrapper = getRender( 'g1UBk', JSON.parse( JSON.stringify( mockProviderData.globalProviderDataProps ) ) );

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
        wrapper = getRender( 'g1UBk', JSON.parse( JSON.stringify( mockProviderData.globalProviderDataProps ) ) );

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
        jest.useFakeTimers();

        wrapper = getRender( 'g1UBk', JSON.parse( JSON.stringify( mockProviderData.globalProviderDataProps ) ) );

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

        act( () => {
            jest.advanceTimersByTime( 3000 );
        });

        expect( updateBasketSpy ).toHaveBeenCalled();
    });

    test( 'should show No Product Found message', () => {
        wrapper = getRender( 'notFound', getDefaultGlobalProviderDataProps() );
        const notFound = wrapper.baseElement.querySelector( '.add-product__not-found-box' );
        expect( notFound ).toBeInTheDocument();
    });

    test( 'should history push to home page', () => {
        wrapper = getRender( 'notFound', getDefaultGlobalProviderDataProps() );

        const button = wrapper.baseElement.querySelector( '.add-product__not-found .MuiButtonBase-root' );
        expect( button ).toBeInTheDocument();
        if ( button ) {
            fireEvent.click( button );
        }

        expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.home );
    });

    test( 'should redirect to login page on null current user and button clicked', () => {
        mockHistoryPush.mockReset();
        mockProviderData.globalProviderDataProps.email = undefined;
        wrapper = getRender( 'g1UBk', mockProviderData.globalProviderDataProps );

        const button = wrapper.baseElement.querySelector( '.add-product__add .shr-button .MuiButtonBase-root' );
        expect( button ).toBeInTheDocument();
        if ( button ) {
            fireEvent.click ( button );
        }

        expect( mockHistoryPush ).toHaveBeenCalledWith( GlobalService.states.signIn );
    });

    test( 'should not render add-product__main class', () => {
        mockProviderData.globalProviderDataProps.products.length = 0;
        wrapper = getRender( 'g1UBk', JSON.parse( JSON.stringify( mockProviderData.globalProviderDataProps ) ) );

        const component = wrapper.baseElement.querySelector( '.add-product__main' );
        expect( component ).not.toBeInTheDocument();
    });
});
