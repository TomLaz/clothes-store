import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductDetail from './ProductDetail';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalContext, GlobalContextProps } from '../../providers/Global/Global.provider';
import { getDefaultGlobalProviderDataProps, getGlobalProviderMockData } from '../../providers/Global/Global.provider.mock';

describe( 'ProductDetail', () => {
    let productDetailProviderMock: GlobalContextProps,
        wrapper: RenderResult;

    const productDetailProps = {
        imgUrl: 'imgUrl',
        imgAlt: 'imgAlt',
        title: 'title',
        color: 'color',
        productDescription: 'productDescription',
        productSize: 'S',
        productQty: '1',
        productUnitPrice: '100',
        productPrice: '100',
        onRemoveProductHandler: jest.fn()
    };

    const getRender = (): RenderResult => {
        productDetailProviderMock = getGlobalProviderMockData( getDefaultGlobalProviderDataProps() );

        return render(
            <Router>
                <Route>
                    <GlobalContext.Provider
                        value={productDetailProviderMock}>
                        <ProductDetail { ...productDetailProps } />
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
        const component = wrapper.baseElement.querySelector( '.product-detail' );
        expect( component ).toBeInTheDocument();
    });

    test( 'should call onRemoveProductHandler on remove button clicked', () => {
        const button = wrapper.baseElement.querySelector( '.product-detail .product-detail__svg' );
        expect( button ).toBeInTheDocument();
        if ( button ) {
            fireEvent.click( button );
        }

        expect( productDetailProps.onRemoveProductHandler ).toHaveBeenCalled();
    });
});
