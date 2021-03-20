import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ShrProduct from './ShrProduct';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps, GlobalProviderData } from '../../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData } from '../../../providers/Global/Global.provider.mock';
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
        wrapper: RenderResult;

    const shrProductProps = {
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

    afterEach( () => {
        cleanup();
        mockHistoryPush.mockReset();
    });

    test( 'should render without error', () => {
        wrapper = getRender( getDefaultGlobalProviderDataProps() );
        const component = wrapper.baseElement.querySelector( '.shr-product' );
        expect( component ).toBeInTheDocument();
    });

    test( 'should call updateFavouritesCollection on remove favorite button clicked', () => {
        wrapper = getRender( getDefaultGlobalProviderDataProps() );
        const removeFavoriteButton = wrapper.baseElement.querySelector( '.shr-product .shr-product__remove-favorite' );
        expect( removeFavoriteButton ).toBeInTheDocument();
        if ( removeFavoriteButton ) {
            fireEvent.click( removeFavoriteButton );
        }

        expect( shrProductProviderMock.updateFavouritesCollection ).toHaveBeenCalled();
    });

    test( 'should call updateFavouritesCollection on add favorite button clicked', () => {
        const providerDataProps = JSON.parse( JSON.stringify( getDefaultGlobalProviderDataProps() ) );
        providerDataProps.favourites.pop();
        providerDataProps.favourites.push({
            'createdAt': {
                'nanoseconds': 215000000,
                'seconds': 1615003734
            },
            'id': 'p0Oacugr3lahoX57pDwN2PalHLW2',
            'products': [ 'kBU1g' ]
        });
        wrapper = getRender( providerDataProps );
        const addFavoriteButton = wrapper.baseElement.querySelector( '.shr-product .shr-product__add-favorite' );
        expect( addFavoriteButton ).toBeInTheDocument();
        if ( addFavoriteButton ) {
            fireEvent.click( addFavoriteButton );
        }

        expect( shrProductProviderMock.updateFavouritesCollection ).toHaveBeenCalled();
    });

    test( 'should redirect to add product page on more info button clicked', () => {
        const providerDataProps = JSON.parse( JSON.stringify( getDefaultGlobalProviderDataProps() ) );
        providerDataProps.favourites.pop();
        wrapper = getRender( providerDataProps );

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

        const productId = getDefaultGlobalProviderDataProps().products[0].id;
        expect( mockHistoryPush ).toHaveBeenCalledWith( `${GlobalService.states.addProduct}/${productId}` );
    });

    test( 'should not render icons on missing user', () => {
        const providerDataProps = JSON.parse( JSON.stringify( getDefaultGlobalProviderDataProps() ) );
        providerDataProps.currentUser = null;
        wrapper = getRender( providerDataProps );

        const addFavoriteButton = wrapper.baseElement.querySelector( '.shr-product .shr-product__add-favorite' );
        expect( addFavoriteButton ).not.toBeInTheDocument();

        const removeFavoriteButton = wrapper.baseElement.querySelector( '.shr-product .shr-product__remove-favorite' );
        expect( removeFavoriteButton ).not.toBeInTheDocument();
    });
});
