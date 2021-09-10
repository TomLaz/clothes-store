import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ShrProduct from './ShrProduct';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps, GlobalProviderData } from '../../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData, mockGlobalProviderData } from '../../../providers/Global/Global.provider.mock';
import GlobalService from '../../../services/Global/Global.service';

const mockHistoryPush = jest.fn();

jest.mock( 'react-router-dom', () => ({
    ...jest.requireActual( 'react-router-dom' ),
    useHistory: (): { push: jest.Mock<any, any>; } => ({
        push: mockHistoryPush
    })
}) );

describe( 'ShrProduct', () => {
    let shrProductProviderMock: GlobalContextProps,
        updateFavouritesSpy: jest.SpyInstance<Promise<void>>,
        wrapper: RenderResult;

    const mockProviderData = mockGlobalProviderData();

    let shrProductProps = {
        product: getDefaultGlobalProviderDataProps().products[0]
    };

    const getRender = ( providerDataProps: GlobalProviderData ): RenderResult => {
        shrProductProviderMock = getGlobalProviderMockData( providerDataProps );

        return render(
            <Router>
                <Route>
                    <GlobalContext.Provider
                        value={shrProductProviderMock}>
                        <ShrProduct {...shrProductProps} />
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
        mockHistoryPush.mockReset();
        mockProviderData.mocksClear();
        updateFavouritesSpy.mockClear();
    });

    test( 'should render without error', () => {
        wrapper = getRender( mockProviderData.globalProviderDataProps );
        const component = wrapper.baseElement.querySelector( '.shr-product' );
        expect( component ).toBeInTheDocument();
    });

    test( 'should call updateFavourites on remove favorite button clicked', () => {
        wrapper = getRender( mockProviderData.globalProviderDataProps );
        const removeFavoriteButton = wrapper.baseElement.querySelector( '.shr-product .shr-product__remove-favorite' );
        expect( removeFavoriteButton ).toBeInTheDocument();
        if ( removeFavoriteButton ) {
            fireEvent.click( removeFavoriteButton );
        }

        expect( updateFavouritesSpy ).toHaveBeenCalled();
    });

    test( 'should call updateFavourites on add favorite button clicked', () => {
        const productTemp = getDefaultGlobalProviderDataProps().products[0];
        productTemp.id = 'newId';
        shrProductProps = {
            product: productTemp
        };

        wrapper = getRender( mockProviderData.globalProviderDataProps );

        const img = wrapper.baseElement.querySelector( '.shr-product__img-principal' );
        if ( img ) {
            fireEvent.load( img );
        }

        const addFavoriteButton = wrapper.baseElement.querySelector( '.shr-product .shr-product__add-favorite' );
        expect( addFavoriteButton ).toBeInTheDocument();
        if ( addFavoriteButton ) {
            fireEvent.click( addFavoriteButton );
        }

        expect( updateFavouritesSpy ).toHaveBeenCalled();
    });

    test( 'should redirect to add product page on more info button clicked', () => {
        const productTemp = getDefaultGlobalProviderDataProps().products[0];
        productTemp.id = 'newId';
        shrProductProps = {
            product: productTemp
        };

        wrapper = getRender( mockProviderData.globalProviderDataProps );

        const addFavoriteButton = wrapper.baseElement.querySelector( '.shr-product .shr-product__add-favorite' );
        expect( addFavoriteButton ).toBeInTheDocument();
        if ( addFavoriteButton ) {
            fireEvent.click( addFavoriteButton );
        }

        const moreInfoButton = wrapper.baseElement.querySelector( '.shr-product__img-wrapper' );
        expect( moreInfoButton ).toBeInTheDocument();
        if ( moreInfoButton ) {
            fireEvent.click( moreInfoButton );
        }

        expect( mockHistoryPush ).toHaveBeenCalledWith( `${GlobalService.states.addProduct}/${productTemp.id}` );
    });

    test( 'should not render icons on missing user', () => {
        const providerDataProps = JSON.parse( JSON.stringify( mockProviderData.globalProviderDataProps ) );
        providerDataProps.email = null;
        wrapper = getRender( providerDataProps );

        const addFavoriteButton = wrapper.baseElement.querySelector( '.shr-product .shr-product__add-favorite' );
        expect( addFavoriteButton ).not.toBeInTheDocument();

        const removeFavoriteButton = wrapper.baseElement.querySelector( '.shr-product .shr-product__remove-favorite' );
        expect( removeFavoriteButton ).not.toBeInTheDocument();
    });
});
